import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';
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
            },
            videoClick: false,
            detailsClick: false
        }

        this.loadData = this.loadData.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.openProfile = this.openProfile.bind(this);
        this.openVideo = this.openVideo.bind(this);
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

    openProfile() {
        this.setState({ detailsClick: true })
    }

    openVideo() {
        this.setState({ detailsClick: false })
    }

    render() {

        return (
            <div>
                <div className="ui fluid card container center aligned">
                    <div className="content">
                        <p className="left floated"><strong>{this.state.profileData.firstName} {this.state.profileData.lastName}</strong></p>
                        <i className="star icon right floated"></i>
                    </div>

                    {this.state.detailsClick ?
                        <div className="image">
                            <img src="http://semantic-ui.com/images/avatar2/large/matthew.png" style={{ height: '300px', backgroundSize: 'cover' }} />
                        </div>
                        :

                        <div className="content">
                            <ReactPlayer
                                url='https://www.youtube.com/watch?v=jYFk1O_t43A'
                                width='520px'
                            />
                        </div>
                    }

                    {this.state.detailsClick ?
                        <div className=" ui right floated content">
                            <div className="description">
                                <p>Current Employer</p>
                                <p><strong>{this.state.profileData.experience[0].company}</strong></p>
                                <p>Visa Status</p>
                                <p><strong>{this.state.profileData.visaStatus}</strong></p>
                                <p>Position</p>

                                <p><strong>{this.state.profileData.experience[0].position}</strong></p>

                            </div>
                        </div>
                        : ""}





                    <div className="extra content">
                        <div className="ui large basic buttons">
                            {this.state.detailsClick === false ?
                                <button type="button" className="ui icon button" onClick={this.openProfile}>
                                    <i className="user icon"></i>
                                </button>
                                :
                                <button type="button" className="ui icon button" onClick={this.openVideo}>
                                    <i className="video icon"></i>
                                </button>
                            }
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
                        {this.state.profileData.skills.map((item, index) =>
                            <div className="ui left floated" key={index}>
                                <span>
                                    <button className="ui disabled primary basic button">
                                        {item.name}
                                    </button>
                                </span>
                                <br />
                                <div>
                                    {item.level === 'Beginner' ?
                                        <i className="star icon"></i> :
                                        ""}
                                    {item.level === 'Intermediate' ?
                                        <div>
                                            <i className="star icon"></i>
                                            <i className="star icon"></i>
                                        </div> : ""
                                    }

                                    {item.level === 'Expert' ?
                                        <div>
                                            <i className="star icon"></i>
                                            <i className="star icon"></i>
                                            <i className="star icon"></i>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}