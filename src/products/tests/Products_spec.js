import { Products } from '../Products.js';
import { initialState } from '../reducer.js';

import React from 'react';
import chai, { assert } from 'chai';
import { shallow, mount } from 'enzyme';

import spies from 'chai-spies';

chai.use(spies);
const should = chai.should();

const triggerLoad = () => {};
const triggerLoadSpy = chai.spy(triggerLoad);

const orderBy = () => {};
const orderBySpy = chai.spy(orderBy);

let props = {
    products: [
        {"id":"0-oej2jpoapzzou9ir3wtpujtt9","size":16,"price":444,"face":"( .-. )","date":"Fri Nov 18 2016 08:28:31 GMT+0100"},
        {"id":"1-r81v9p3nzv9ttb0al2o869a4i","size":38,"price":449,"face":"( .o.)","date":"Sun Nov 20 2016 11:48:10 GMT+0100"},
        {"id":"2-7747ogyv4d2ytvsil1orj7zaor","size":35,"price":226,"face":"( `·´ )","date":"Thu Nov 24 2016 15:44:51 GMT+0100"},
        {"id":"3-ayn88vkburnhpi903eql0daemi","size":36,"price":993,"face":"( ° ͜ ʖ °)","date":"Tue Nov 22 2016 22:25:13 GMT+0100"},
        {"id":"4-ir0zhh1z0fesfkio2qe4mfgvi","size":32,"price":812,"face":"( ͡° ͜ʖ ͡°)","date":"Sun Nov 20 2016 02:42:15 GMT+0100"},
        {"id":"5-bq6z1mqnvedc7vlz4wtr9t3xr","size":34,"price":303,"face":"( ⚆ _ ⚆ )","date":"Sun Nov 27 2016 22:50:57 GMT+0100"},
        {"id":"6-keto0sj4n3ktquytpve9g4x6r","size":23,"price":861,"face":"( ︶︿︶)","date":"Mon Nov 28 2016 08:10:58 GMT+0100"},
        {"id":"7-wifeyrz986en68z7yglxflxr","size":39,"price":405,"face":"( ﾟヮﾟ)","date":"Fri Nov 18 2016 18:54:13 GMT+0100"},
        {"id":"8-wf49yhahmtcshnsc5bz9f6r","size":34,"price":822,"face":"(\\/)(°,,,°)(\\/)","date":"Sun Nov 20 2016 09:51:39 GMT+0100"},
        {"id":"9-am85pdry3tz3qtk3hf4xi529","size":35,"price":229,"face":"(¬_¬)","date":"Thu Nov 17 2016 14:12:52 GMT+0100"},
        {"id":"10-nnk7g3ui3f6gd5krsh2f647vi","size":24,"price":473,"face":"(¬º-°)¬","date":"Thu Nov 17 2016 14:14:45 GMT+0100"},
        {"id":"11-z2k6o73jpa6zxztk1kxyfogvi","size":19,"price":494,"face":"(¬‿¬)","date":"Mon Nov 21 2016 17:40:44 GMT+0100"},
        {"id":"12-t0r1ldcknq00q90gi2iroogvi","size":20,"price":912,"face":"(°ロ°)☝","date":"Sun Nov 27 2016 00:25:57 GMT+0100"},
        {"id":"13-9gt9w2y1iebb5iqlrje4cgnwmi","size":17,"price":615,"face":"(´・ω・)っ","date":"Thu Nov 24 2016 21:48:11 GMT+0100"},
        {"id":"14-0kvozzdcsq3w0f0qqrownlv7vi","size":22,"price":221,"face":"(ó ì_í)","date":"Sun Nov 20 2016 01:05:45 GMT+0100"},
        {"id":"15-oqlmrpt5f4l7nuxjcl7toi529","size":31,"price":662,"face":"(ʘᗩʘ')","date":"Sun Nov 27 2016 15:31:28 GMT+0100"},
        {"id":"16-1erlbfk27ngwqlg3epu6h9qkt9","size":21,"price":799,"face":"(ʘ‿ʘ)","date":"Mon Nov 21 2016 15:08:41 GMT+0100"},
        {"id":"17-vnmw1xda0dj32mqu6x3zbyb9","size":28,"price":930,"face":"(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄","date":"Fri Nov 18 2016 14:26:50 GMT+0100"},
        {"id":"18-7wtz6dm6enpdau7r2aprb2o6r","size":31,"price":843,"face":"(͡° ͜ʖ ͡°)","date":"Tue Nov 22 2016 23:29:12 GMT+0100"},
        {"id":"19-wcc3bs4e9yd67vadfuo25u3di","size":21,"price":703,"face":"ᕦ( ͡° ͜ʖ ͡°)ᕤ","date":"Sat Nov 26 2016 06:00:21 GMT+0100"},
        {"id":"20-ajp555dyx1dfi1ukq7rkbuik9","size":14,"price":483,"face":"(ಠ_ಠ)","date":"Thu Nov 24 2016 08:24:58 GMT+0100"},
        {"id":"21-6sxfa6eh4kz99xt77kdtcmzpvi","size":38,"price":138,"face":"(ಠ‿ಠ)","date":"Thu Nov 17 2016 12:18:02 GMT+0100"},
        {"id":"22-u4mot3wkhbnvdobdenn42huxr","size":24,"price":372,"face":"(ಠ⌣ಠ)","date":"Wed Nov 23 2016 17:06:51 GMT+0100"},
        {"id":"23-siaz81rzuk40zllfioy99t3xr","size":39,"price":107,"face":"(ಥ_ಥ)","date":"Thu Dec 01 2016 09:28:00 GMT+0100"},
        {"id":"24-gphfv0ko2hjs87h70af6flxr","size":20,"price":882,"face":"(ಥ﹏ಥ)","date":"Wed Nov 23 2016 10:08:37 GMT+0100"},
        {"id":"25-lodr75fub1q23430qi553ik9","size":12,"price":729,"face":"(ง ͠° ͟ل͜ ͡°)ง","date":"Thu Nov 24 2016 15:15:52 GMT+0100"},
        {"id":"26-mst468eoemqs8oa58v39mgqfr","size":23,"price":121,"face":"(ง ͡ʘ ͜ʖ ͡ʘ)ง","date":"Fri Nov 18 2016 06:28:29 GMT+0100"},
        {"id":"27-ynwyex465mmxh63n59aspds4i","size":34,"price":641,"face":"(ง •̀_•́)ง","date":"Sat Nov 19 2016 09:59:10 GMT+0100"},
        {"id":"28-3f40b5gvjz0e0nnmtuvqdunmi","size":18,"price":885,"face":"(ง'̀-'́)ง","date":"Sun Nov 27 2016 03:51:40 GMT+0100"},
        {"id":"29-w6h9u9h4k5la8skln4von7b9","size":38,"price":160,"face":"(ง°ل͜°)ง","date":"Tue Nov 29 2016 23:41:14 GMT+0100"},
        {"id":"30-lrxnscsruvy58an9nxmzhbyb9","size":23,"price":225,"face":"(ง⌐□ل͜□)ง","date":"Sun Nov 20 2016 11:55:42 GMT+0100"},
        {"id":"31-7y7wl127ma8kx3ui08zkc5wmi","size":26,"price":695,"face":"(ღ˘⌣˘ღ)","date":"Thu Nov 24 2016 03:11:07 GMT+0100"},
        {"id":"32-8kp98angdfix6wbt5vh146lxr","size":34,"price":330,"face":"(ᵔᴥᵔ)","date":"Wed Nov 23 2016 08:08:28 GMT+0100"},
        {"id":"33-kyene7glr2wejyehzg7722o6r","size":39,"price":532,"face":"(•ω•)","date":"Sun Nov 27 2016 20:01:47 GMT+0100"},
        {"id":"34-ow6et84b3te3tvvadmgjbgldi","size":33,"price":281,"face":"(•◡•)/","date":"Fri Nov 18 2016 09:20:18 GMT+0100"},
        {"id":"35-adhe7clz720c1w94qrc04quxr","size":12,"price":926,"face":"(⊙ω⊙)","date":"Wed Nov 23 2016 15:46:12 GMT+0100"},
        {"id":"36-f7zvtl37dy5qed49zzperpy14i","size":19,"price":487,"face":"(⌐■_■)","date":"Thu Nov 24 2016 04:10:19 GMT+0100"},
        {"id":"37-7yxi0nwcd4xkdkk46ecn3zncdi","size":36,"price":29,"face":"(─‿‿─)","date":"Mon Nov 28 2016 20:10:06 GMT+0100"},
        {"id":"38-bsrscf6ifiiajszob7wxm3g14i","size":37,"price":146,"face":"(╯°□°）╯","date":"Sat Nov 26 2016 18:52:24 GMT+0100"},
        {"id":"39-k861w0eol3hbs147ekigam7vi","size":18,"price":640,"face":"(◕‿◕)","date":"Tue Nov 29 2016 11:21:37 GMT+0100"},
        {"id":"40-1lyz8xtzyu647oml475lqy3nmi","size":37,"price":26,"face":"(☞ﾟ∀ﾟ)☞","date":"Wed Nov 23 2016 16:42:52 GMT+0100"},
        {"id":"41-m1xw1d0bx19uy9cceuerk9","size":27,"price":373,"face":"(❍ᴥ❍ʋ)","date":"Mon Nov 28 2016 18:05:23 GMT+0100"},
        {"id":"42-o40rd3yg8dsbzpmrqu8tzkt9","size":14,"price":903,"face":"(っ◕‿◕)っ","date":"Mon Nov 21 2016 01:46:40 GMT+0100"},
        {"id":"43-bmd5bbq7t2t0pj43mbdoq1tt9","size":24,"price":220,"face":"(づ｡◕‿‿◕｡)づ","date":"Fri Nov 25 2016 01:26:57 GMT+0100"},
        {"id":"44-plyec3k4se6v2yn4a5dbo6r","size":34,"price":971,"face":"(ノಠ益ಠ)ノ","date":"Thu Nov 17 2016 23:17:45 GMT+0100"},
        {"id":"45-m6awp5wo88ejk531lnt32fbt9","size":26,"price":388,"face":"(ノ・∀・)ノ","date":"Thu Nov 24 2016 17:54:39 GMT+0100"},
        {"id":"46-r4dkbym29jc0h800f70lzncdi","size":33,"price":93,"face":"(；一_一)","date":"Fri Nov 18 2016 11:50:00 GMT+0100"},
        {"id":"47-b7lqjtup66c7ytw6yavh1tt9","size":30,"price":32,"face":"(｀◔ ω ◔´)","date":"Fri Nov 25 2016 14:37:05 GMT+0100"},
        {"id":"48-ezt708bhe0v9cg5a7vnc7syvi","size":29,"price":517,"face":"(｡◕‿‿◕｡)","date":"Sat Nov 26 2016 19:25:42 GMT+0100"},
        {"id":"49-je5qabu5xbiwhxp3qfewb3xr","size":33,"price":195,"face":"(ﾉ◕ヮ◕)ﾉ","date":"Sun Nov 20 2016 05:16:01 GMT+0100"}
    ],
    triggerLoad: triggerLoadSpy,
    orderBy: orderBySpy
};

props = Object.assign({}, initialState, props);

import productsStyles from '../products.sass';
import loaderStyles from '../../components/Loader/loader.sass';
import triggerStyles from '../../components/LoadingTrigger/trigger.sass';

describe('Products', () => {
    it('Renders DIV tag', () => {
        const component = shallow(<Products {...props}/>);
        assert.equal(component.find('div').length, 1);
    });

    it('Renders Ordering component tag', () => {
        const component = mount(<Products {...props}/>);
        assert.equal(component.find(`.${productsStyles.ordering}`).length, 1);
    });

    it('Renders Ordering buttons', () => {
        const component = mount(<Products {...props}/>);
        assert.equal(component.find(`.${productsStyles.ordering} .btn`).length, 4);
        assert.equal(component.find(`.${productsStyles.ordering} .btn .btn-primary`).length, 1);
    });

    it('Renders products list with banner after every 20 products', () => {
        const component = mount(<Products {...props}/>);
        const bannersNum = Math.floor(props.products.length / props.bannerEvery);

        assert.equal(component.find(`.${productsStyles.item}`).length, props.products.length);
        assert.equal(component.find(`.${productsStyles.list}`).children().length, props.products.length + bannersNum);
    });

    it('Renders trigger element', () => {
        const component = mount(<Products {...props}/>);
        assert.equal(component.find(`.${triggerStyles.trigger}`).length, 1);
    });

    it('Renders loading indicator', () => {
        const localProps = Object.assign({}, props, { fetching: true });
        const component = mount(<Products {...localProps}/>);
        assert.equal(component.find(`.${loaderStyles.loader}`).length, 1);
    });

    it('Renders finished message', () => {
        const localProps = Object.assign({}, props, { finished: true });
        const component = mount(<Products {...localProps}/>);
        assert.equal(component.find(`.${productsStyles.finished}`).length, 1);
    });

    it('Renders error message and does not render trigger if errored', () => {
        const localProps = Object.assign({}, props, { error: true });
        const component = mount(<Products {...localProps}/>);
        assert.equal(component.find(`.${productsStyles.error}`).length, 1);
        assert.equal(component.find(`.${triggerStyles.trigger}`).length, 0);
    });
});
