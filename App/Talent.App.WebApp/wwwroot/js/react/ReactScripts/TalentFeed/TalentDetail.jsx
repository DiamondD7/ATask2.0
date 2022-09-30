import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';

export default class TalentDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profileData: {
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [{ start: '', end: '', position: '' }],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: ""
                }
            }
        }

        this.loadData = this.loadData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        var currentUser = '632d9ef55058f768202d3035'
        $.ajax({
            url: 'http://localhost:60290/profile/profile/' + currentUser,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let profileData = null;
                if (res.data) {
                    profileData = res.data;
                }
                console.log(res.data);
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }

    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    render() {
        return (
            <div>
                <div className="ui link card container center aligned">
                    <div className="content">
                        <p className="left floated"><strong>{this.state.profileData.firstName} {this.state.profileData.lastName}</strong></p>
                        <i className="star icon right floated"></i>
                    </div>

                    <div className="image">
                        <img src="http://semantic-ui.com/images/avatar2/large/matthew.png" />

                    </div>
                    <div className="content">
                        <div className="description">
                            <p><strong>Talent Snapshot</strong></p>
                            <p>Current Employer</p>
                            <p>ABC</p>
                            <p>Visa Status</p>
                            <p>{this.state.profileData.visaStatus}</p>
                            <p>Position</p>

                            <p>Software Developer</p>

                        </div>
                    </div>

                    <div className="extra content">
                        <div className="ui large basic buttons">
                            <button type="button" className="ui icon button">
                                <i className="video icon"></i>
                            </button>
                            <button type="button" className="ui icon button">
                                <i className="file pdf outline icon"></i>
                            </button>
                            <a type="button" className="ui icon button" target="_blank" href={this.state.profileData.linkedAccounts.linkedIn}>
                                <i className="linkedin icon"></i>
                            </a>
                            <a type="button" className="ui icon button" target="_blank" href={this.state.profileData.linkedAccounts.github}>
                                <i className="github icon"></i>
                            </a>
                        </div>
                    </div>
                    <div className="extra content">
                    </div>
                </div>
                
            </div>
        )
    }
}