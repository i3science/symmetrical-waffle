import React from 'react';
import Actions from '../../../actions/UiActions';
import assetStore from '../../../stores/AssetStore';
import Card from '../../common/Card';

export default class ProjectAssets extends React.Component {
    constructor() {
        super();
        this.state = {
            assets: null
        };
        this._onAssetsChange = this._onAssetsChange.bind(this);
    }

    componentWillMount() {
        assetStore.addChangeListener(this._onAssetsChange);
        Actions.findAssetsForProject(this.props.project);
    }

    componentWillUnmount() {
        assetStore.removeChangeListener(this._onAssetsChange);
    }

    _onAssetsChange() {
        this.setState({ assets: assetStore.getAssets() });
    }

    renderAssets() {
        return (
            <div className="row">
            {
                this.state.assets.map((asset) => {
                    return (
                        <div className="col s2" key={asset._id}>
                            <Card>
                                <div className="center-align">
                                    <i className="large material-icons">description</i>
                                </div>
                                <p className="center-align"><strong><a href={'/projects/'+this.props.project._id+'/assets/'+asset._id+'/file'}>{asset.name}</a></strong></p>
                            </Card>
                        </div>
                    );
                })
            }
            </div>
        );
    }

    renderAdder() {
        return (
            <form action={'/projects/'+this.props.project._id+'/assets'} method="post" encType="multipart/form-data">
                <label htmlFor="file">
                    File
                    <input type="file" name="file" id="file"/>
                </label>
                <input type="submit" value="Upload"/>
            </form>
        );
    }

    render() {
        if (this.state.assets == null) {
            return (<Card title="Digital Assets"><p>Loading assets...</p></Card>);
        }

        return (
            <Card title="Digital Assets">
                {this.renderAssets()}
                {this.renderAdder()}
            </Card>
        );
    }
}



// export default class CampaignElements extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             elements: null
//         };
//         this._onElementsChange = this._onElementsChange.bind(this);
//     }

//     componentWillMount() {
//         campaignElementStore.addChangeListener(this._onElementsChange);
//         CampaignElementActions.findForProject(this.props.project);
//     }

//     componentWillUnmount() {
//         campaignElementStore.removeChangeListener(this._onElementsChange);
//     }

//     _onElementsChange() {
//         this.setState({ elements: campaignElementStore.getElements() });
//     }

//     renderElements() {
//         return (
//             <div className="row">
//             {
//                 this.state.elements.map((el) => {
//                     return (
//                         <div className="col s2" key={el._id}>
//                             <Card>
//                                 <div className="center-align">
//                                     <i className="large material-icons">description</i>
//                                 </div>
//                                 <p className="center-align"><input type="checkbox" disabled="disabled"/> Due Dec. 15</p>
//                                 <p className="center-align"><strong><Link to={'/projects/'+this.props.project._id+'/elements/'+el._id}>{el.name}</Link></strong></p>
//                             </Card>
//                         </div>
//                     );
//                 })
//             }
//             </div>
//         );
//     }

//     render() {
//         if (!this.state.elements) {
//             return (<Card title="Campaign Elements"><p>Loading campaign elements...</p></Card>);
//         }
//         return (
//             <Card title="Campaign Elements">
//                 {this.renderElements()}
//             </Card>
//         );
//     }
// }