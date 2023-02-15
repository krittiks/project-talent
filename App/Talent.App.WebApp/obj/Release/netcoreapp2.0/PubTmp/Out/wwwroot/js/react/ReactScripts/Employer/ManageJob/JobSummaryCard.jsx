import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        console.log('props.location.state.params.id',props.location.state.params.id)

        this.state={
            jid : this.props.location.state.params.id
        }

        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
          //  url:  'http://localhost:51689/listing/listing/closeJob',
          url : 'https://webapptalent.azurewebsites.net/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType:'json',
            type: "post",
            data: JSON.stringify(id),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show(res.message, "success", null, null);
                    window.location = "/ManageJobs";
                   
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }
                
            }.bind(this)
        })

    }

    render() {
        
        return(
        
        this.selectJob(this.state.jid)
        
        )
    }
}