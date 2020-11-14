import React from 'react';
import Header from './components/header';
import Banner from './components/banner';
import Ads from './components/ads';
import Recommendation from './components/recommendation';


class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Banner />
                <Ads url="https://tpc.googlesyndication.com/simgad/1123053959195589078" />
                <Recommendation />
                <Ads url="https://tpc.googlesyndication.com/simgad/1123053959195589078" />
            </div>

        );
    }
}


export default Home;