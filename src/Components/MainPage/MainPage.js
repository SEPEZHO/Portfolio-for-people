import React from 'react';
import Links from './Links/Links';
import Text from './Text/Text';
import Slider from './Slider/Slider';
import s from './Style/MainPage.module.sass';
const MainPage = () => {
    return (React.createElement("div", { className: s.container },
        React.createElement("div", { className: s.mainPage },
            React.createElement("div", { className: s.CenterMain },
                React.createElement(Links, null),
                React.createElement(Text, null),
                React.createElement(Slider, null)))));
};
export default MainPage;
//# sourceMappingURL=MainPage.js.map