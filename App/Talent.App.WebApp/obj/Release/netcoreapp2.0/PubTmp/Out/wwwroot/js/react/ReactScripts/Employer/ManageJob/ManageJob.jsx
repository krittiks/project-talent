import React, { Fragment } from 'react';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Dropdown, Pagination, Table,Icon } from 'semantic-ui-react';
import JobList from './JobList.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        console.log('loader',loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            postPerPage:3,            
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
       
        //your functions go here
      
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        
        //this.setState({ loaderData, });//comment this

       // set loaderData.isLoading to false after getting data
         this.loadData(() =>
            this.setState({ loaderData, })
         )

    }

    componentDidMount() {
        this.init();        
        this.loadData();
      
    };    

    loadData(callback) {
      // var link='http://localhost:51689/listing/listing/getSortedEmployerJobs';
      var link ='https://webapptalent.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
       $.ajax({
        url:link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        data:{
            activePage:this.state.activePage,
            showActive:this.state.filter.showActive,
            showClosed:this.state.filter.showClosed,
            showExpired:this.state.filter.showExpired,
            showUnexpired:this.state.filter.showUnexpired
        },
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            //let loadJobs = [];
            if (res.myJobs) {
                this.setState( {loadJobs : res.myJobs })
            }
            loaderData.isLoading = false;
           
        }.bind(this),
        error: function (res) {
            console.log(res.status)
        }
    }) 
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

   
    render() {        
        var indexOfLastPost = this.state.activePage * this.state.postPerPage
        var indexOfFirstPost =  indexOfLastPost - this.state.postPerPage   

        return (
        <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
               <h2>List of Jobs</h2>
                <Table collapsing basic="very" >
                <Table.Header>
                    
                <Table.Row>
                    <Table.Cell > <Icon name='filter'/>Filter:                     
                    <Dropdown 
                    text ='Choose filter'/> 
                     &nbsp;&nbsp;&nbsp; 
                    <Icon name='calendar alternate'/>Sort by date:                    
                    <Dropdown text='Newest first' >
                        
                    </Dropdown>                
                    </Table.Cell>

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                       <Table.Row>
                        <Table.Cell>
                        <JobList
                        loadJobs={this.state.loadJobs}
                        indexOfFirstPost={indexOfFirstPost}
                        indexOfLastPost={indexOfLastPost}
                        />
                        </Table.Cell>
                        </Table.Row>
                </Table.Body>
            
                </Table>
                
                <div style={{display : 'inline-block', 
                                marginTop : 30,
                                marginLeft : '45%'
                            }}>

               
                 <Pagination
                    defaultActivePage={this.state.activePage}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={Math.ceil(this.state.loadJobs.length/this.state.postPerPage)}
                    boundaryRange={0}
                    ellipsisItem={null}
                    siblingRange={0}
                    onPageChange={(e, { activePage }) => this.setState({ activePage }) }
                 />
              
              
            </div>
            </div>
                <br/><br/>
        </BodyWrapper>  
        )
    }
}
