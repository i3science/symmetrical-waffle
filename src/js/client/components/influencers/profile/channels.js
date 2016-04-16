import React from 'react'; // eslint-disable-line no-unused-vars

const Channel = (props) => {
    if (!props.channel
            || !props.channels[props.channel]
            || !(props.channels[props.channel].impressions > 0)) {
        return <span></span>;
    }
    let socialLink = props.channels[props.channel].link.length > 5;
    return (
        <div className={'col ' + (props.col ? props.col : 's3')} style={{position: 'relative'}}>
            <div href={props.channels[props.channel].link} target="_blank"
               style={{
                width: '35px',
                height: '35px',
                margin: '7px 0',
                padding: '7px',
                position: 'absolute',
                background: socialLink ? 'rgba(0,0,0,0.3)' : 'rgba(255,0,0,0.6)',
                borderRadius: '50%'
            }}>
                {socialLink ?
                <a href={props.channels[props.channel].link} target="_blank">
                    <img src={'/assets/images/social/' + props.channel + '.png'} style={{width: '100%'}} />
                </a> :
                <img src={'/assets/images/social/' + props.channel + '.png'} style={{width: '100%'}} />}
            </div>
            <div style={{
                paddingLeft: '45px',
                fontSize: '17px',
                lineHeight: '1'
            }}><p>{props.channels[props.channel].impressions}</p>
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
            <Channel
                channel="facebook"
                {...props}
            />
            <Channel
                channel="twitter"
                {...props}
            />
            <Channel
                channel="pinterest"
                {...props}
            />
            <Channel
                channel="instagram"
                {...props}
            />
            <Channel
                channel="googleplus"
                {...props}
            />
            <Channel
                channel="blog"
                {...props}
            />
            <Channel
                channel="youtube"
                {...props}
            />
            <Channel
                channel="snapchat"
                {...props}
            />
        </div>
    );
};

export default Channels;


