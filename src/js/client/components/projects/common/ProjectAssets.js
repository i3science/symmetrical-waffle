import React from 'react';
import Actions from '../../../actions/UiActions';
import assetStore from '../../../stores/AssetStore';

export default class ProjectAssets extends React.Component {
    constructor() {
        super();
        this.state = {
            assets: null
        };
        this._onAssetsChange = this._onAssetsChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
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
    _onSubmit(event) {
        event.preventDefault();

        let file = $(event.target).find('input[type="file"]')[0].files[0];
        if (!file) {
            // TODO Error no file given
            return;
        }

        let reader = new FileReader();
        reader.addEventListener('load', function(){
            let data = new FormData();
            data.append('file', file);
            Actions.uploadAsset(this.props.project, data, reader.result, file.name);
        }.bind(this), false);
        reader.readAsDataURL(file);
    }

    render() {
        if (this.state.assets == null) {
            return (<p>Loading assets...</p>);
        }
        let renderAssets = this.state.assets.map((asset) => {
            return (
                <div className="col s2" key={asset._id}>
                    <div className="card">
                        <div className="center-align" style={{
                            background: 'url('+ asset.datauri +') no-repeat rgba(0,0,0,0.3) 50%',
                            backgroundSize: 'cover',
                            width: '100%',
                            padding: '50%'
                        }}>
                        </div>
                        <div style={{
                            padding: '10px',
                            borderTop: '1px solid rgba(0,0,0,0.1)'
                        }}>
                            <p style={{margin: '0'}}><strong>
                                <a style={{wordWrap: 'break-word'}}  className="grey-text text-darken-2" href={'/projects/'+this.props.project._id+'/assets/'+asset._id+'/file'}>{asset.name}</a>
                            </strong></p>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className="row">
                    {renderAssets}
                </div>

                <form action={'/projects/'+this.props.project._id+'/assets'} onSubmit={this._onSubmit} method="post" encType="multipart/form-data">
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" name="file" id="file"/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn-large teal" type="submit">Upload</button>
                </form>
            </div>
        );
    }
}