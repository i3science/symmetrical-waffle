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
            return (<p>Loading assets...</p>);
        }
        let renderAssets = this.state.assets.map((asset) => {
            return (
                <div className="col s2" key={asset._id}>
                    <div className="center-align" style={{
                        background: 'url('+asset.datauri+')',
                        backgroundSize: '100% auto',
                        width: '100%',
                        height: '200px'
                    }}>

                    </div>
                    <p><strong>
                        <a href={'/projects/'+this.props.project._id+'/assets/'+asset._id+'/file'}>{asset.name}</a>
                    </strong></p>
                </div>
            );
        });

        return (
            <div>
                <div className="row">
                    {renderAssets}
                </div>

                {this.renderAdder()}
            </div>
        );
    }
}