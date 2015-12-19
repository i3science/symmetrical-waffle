import influencerService from '../services/InfluencerService.js';

class InfluencerController {
    list(req, res) {
        return influencerService
            .list({})
            .then(function(influencers){
                return res.jsonp(influencers);
            })
            .fail(function(){
                return res.status(400).send({
                    message: 'An error occurred'
                });
            });
    }
    find() {

    }
    create() {

    }
    update() {

    }
    delete() {

    }
}

export default new InfluencerController();