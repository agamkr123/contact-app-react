import React, { Component } from 'react'

import { ReactComponent as Vector1 } from '../../resources/images/svgs/Vector1.svg';
import { ReactComponent as Vector2 } from '../../resources/images/svgs/Vector2.svg';
import { ReactComponent as Ellipese51 } from '../../resources/images/svgs/Ellipse 51.svg';
import { ReactComponent as Ellipese52 } from '../../resources/images/svgs/Ellipse 52.svg';
import { ReactComponent as Ellipese53 } from '../../resources/images/svgs/Ellipse 53.svg';
import { ReactComponent as Ellipese54 } from '../../resources/images/svgs/Ellipse 54.svg';
import { ReactComponent as Ellipese55 } from '../../resources/images/svgs/Ellipse 55.svg';
import { ReactComponent as Ellipese56 } from '../../resources/images/svgs/Ellipse 56.svg';


import './background_compoenent.scss';

export default class BackgroundComponent extends Component {
  render() {
    return (
        <div className="background-wrapper">
            <Vector1 className="vector1"/>
            <Vector2 className="vector2"/>
            <Ellipese51 className="ellipese ellipese51"/>
            <Ellipese52 className="ellipese ellipese52"/>
            <Ellipese53 className="ellipese ellipese53"/>
            <Ellipese54 className="ellipese ellipese54"/>
            <Ellipese55 className="ellipese ellipese55"/>
            <Ellipese56 className="ellipese ellipese56"/>
        </div>
    )
  }
}
