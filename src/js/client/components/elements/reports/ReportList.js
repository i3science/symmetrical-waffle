import React from 'react'; // eslint-disable-line no-unused-vars

const ReportList = (props) => {
    let reports = props.reports.map((item, index) => {
        return (
            <div key={index} className="row reports" style={{marginBottom: '0', position: 'relative', paddingLeft: '20px'}}>
                <div className="col s6">
                    <p>{item.name}</p>
                </div>
                <div className="col s2 right-align">
                    <p>{item.number}</p>
                </div>
                <div className="col s4 right-align">
                    <p>{item.link ?
                        <a
                            style={{textTransform: 'uppercase'}}
                            className="teal-text"
                            href={item.link}
                            target="_blank">
                            Visit Site &nbsp;
                            <i className="material-icons">forward</i>
                        </a> : null}
                    </p>
                </div>
                <div className="col s12" style={{position: 'absolute', bottom: '10px'}}>
                    <button
                        className="btn-flat tiny white green-text"
                        type="submit"
                        style={{marginRight: '40px'}}
                        onClick={props.removeReport ? props.updateReport.bind(null, index, props.name) : null}>
                        <i className="material-icons right">edit</i>
                        Edit
                    </button>
                    <button
                        className="btn-flat tiny white red-text"
                        type="button"
                        onClick={props.removeReport ? props.removeReport.bind(null, index, props.name) : null}>
                        <i className="material-icons right">clear</i>
                        Delete
                    </button>
                </div>
            </div>
        );
    });
    return (
        <div>{reports}</div>
    );
};

export default ReportList;