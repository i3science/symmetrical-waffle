import React from 'react'; // eslint-disable-line no-unused-vars

const Reach = (props) => {
    let reach = props.reach.map(item => {
        let icon;
        switch (item.medium) {
            case 'facebook':
                icon = 'perm_identity';
                break;
            case 'twitter':
                icon = 'query_builder';
                break;
            case 'pinterest':
                icon = 'polymer';
                break;
            case 'instagram':
                icon = 'print';
                break;
            case 'youtube':
                icon = 'play_for_work';
                break;
            case 'blog':
                icon = 'invert_colors';
                break;
            case 'googleplus':
                icon = 'email';
                break;
        }
        return (
            <div key={item.medium} className={'valign-wrapper col ' + (props.col ? props.col : 's3')} style={{height:'40px',marginBottom:'10px'}}>
                <h6 className="valign teal-text">
                    <i className="material-icons circle teal lighten-3 white-text"
                       style={{
                           padding:'4px',
                           border:'2px solid #009688',
                           margin:'0 10px'
                       }}>{icon}</i>
                    {item.value}
                </h6>
            </div>
        );
    });
    return (
        <div >
            {reach}
        </div>
    );
};

export default Reach;