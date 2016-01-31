import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ListItem from './listitem';
import Form from '../common/Form';

var list = {
    name: 'Mommies',
    added: 112015,
    influencers: []
};
var list2 = {
    name: 'Good list for Ford',
    added: 112016,
    influencers: []
};

var lists = [
    list,
    list2,
    list,
    list2,
    list,
    list2,
    list,
    list2,
    list,
    list2,
    list,
    list2
];

const ListResults = (props) => {
    let results = props.lists.map((item, index) => {
        return (
            <ListItem key={index}
                        list={item}
            />
        );
    });
    return (
        <div className="">
            <div className="row">
                {results}
            </div>
        </div>
    );
};

class ListPage extends React.Component {
    constructor() {
        super();
        this.state = {
            listResults: [],
            lists: [],
            filter: {
                keyword: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.setState({lists: lists});
    }
    handleChange(event) {
        this.state.filter[event.target.id] = event.target.value;
        this.setState({filter: this.state.filter});

        if ((this.state.filter.keyword).length > 0 && (this.state.filter.keyword) !== (' ' || '' || null || undefined)) {
            this.state.listResults = _.filter(this.state.lists, function (item) {
                let keyword = item.name.toLowerCase();
                return keyword.indexOf(this.state.filter.keyword.toLowerCase()) > -1;
            }, this);
        } else {
            this.state.listResults = [];
        }
        this.setState({listResults: this.state.listResults});
    }
    render() {
        var keyword = this.state.filter.keyword;
        return (
            <div>
                <div className="card-panel z-depth-4">
                    <div className="row center-align">
                        <h4 className="grey-text text-darken-2">Find a List</h4>
                        <div className="col s10" style={{margin: '0 auto', float: 'none'}}>
                            <div className="row" style={{marginTop: '50px'}}>
                                <div className="col s6" style={{margin: '0 auto', float: 'none'}}>
                                    <Form.Text
                                        name="keyword"
                                        label="Keyword"
                                        color="teal"
                                        placeholder="Start typing a keyword"
                                        value={keyword}
                                        active={true}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row center-align">
                        <Link to="/search" className="teal waves-effect waves-light btn-large center"><i className="material-icons right">list</i>Create a list</Link>
                    </div>
                </div>
                <h5 className="center-align teal-text">{(this.state.listResults && this.state.listResults.length > 0) ? this.state.listResults.length + ' results' : ''}</h5>
                <ListResults
                    lists={this.state.listResults}
                />

            </div>
        );
    }
}

export default ListPage;