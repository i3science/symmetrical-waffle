import React from 'react'; // eslint-disable-line no-unused-vars

const Channel = (props) => {
    if (!props.channel) {
        return <div></div>;
    }
    return (
        <div className={'col ' + (props.col ? props.col : 's3')} style={{position: 'relative'}}>
            <div style={{
                width: '35px',
                height: '50px',
                padding: '7px 0',
                position: 'absolute'
            }}><img src={'/assets/images/social/' + props.channel + '.png'} style={{width: '100%', opacity: '.3'}} />
            </div>
            <div style={{
                paddingLeft: '45px',
                fontSize: '17px',
                lineHeight: '1'
            }}><p>{props.channels[props.channel]}</p>
            </div>
        </div>
    );
};

const Channels = (props) => {
    if (!props.channels) {
        return <div></div>;
    }
    return (
        <div className="row">
            {props.channels.facebook > 0 ?
            <Channel
                channel="facebook"
                {...props}
            /> : null}
            {props.channels.twitter > 0 ?
            <Channel
                channel="twitter"
                {...props}
            /> : null}
            {props.channels.pinterest > 0 ?
            <Channel
                channel="pinterest"
                {...props}
            /> : null}
            {props.channels.instagram > 0 ?
            <Channel
                channel="instagram"
                {...props}
            /> : null}
            {props.channels.googleplus > 0 ?
            <Channel
                channel="googleplus"
                {...props}
            /> : null}
            {props.channels.blogger > 0 ?
            <Channel
                channel="blogger"
                {...props}
            /> : null}
            {props.channels.youtube > 0 ?
            <Channel
                channel="youtube"
                {...props}
            /> : null}
            {props.channels.snapchat > 0 ?
            <Channel
                channel="snapchat"
                {...props}
            /> : null}
        </div>
    );
};

export default Channels;


