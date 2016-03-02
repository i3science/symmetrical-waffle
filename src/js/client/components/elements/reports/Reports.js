import React from 'react'; // eslint-disable-line no-unused-vars
import ReportList from './ReportList';
import AddReport from './AddReport';

const Reports = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s6">
                    <h6>Halfway Report</h6><br />
                    {props.reports.half.length !== 0 ?
                        <ReportList
                            name="half"
                            reports={props.reports.half}
                            removeReport={props.removeReport}
                            updateReport={props.updateReport}
                        /> : null}

                </div>
                <div className="col s6">
                    <h6>End of Campaign Results</h6><br />
                    {props.reports.end.length !== 0 ?
                        <ReportList
                            name="end"
                            reports={props.reports.end}
                            removeReport={props.removeReport}
                            updateReport={props.updateReport}
                        /> : null}
                </div>
            </div>
            <div className="row" style={{marginBottom: '0'}}>
                <div className="col s6">
                    <AddReport
                        name="half"
                        editReport={props.editReport}
                        onSave={props.onSave}
                    />
                </div>
                <div className="col s6">
                    <AddReport
                        name="end"
                        editReport={props.editReport}
                        onSave={props.onSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reports;