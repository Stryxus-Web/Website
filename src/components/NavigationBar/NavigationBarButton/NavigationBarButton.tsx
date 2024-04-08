import "./NavigationBarButton.sass";

import { Component } from "preact";
import { Link } from "preact-router/match";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ComProps {
    title: string;
    relativeLink: string;
    icon: IconProp;
}

export interface ComState {

}

export default class NavigationBarButton extends Component<ComProps, ComState> {

    constructor(props: ComProps) {
        super(props);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(props: ComProps) {
        return (
            <Link activeClassName="active" href={props.relativeLink} class="nav-button">
                <div class="icon-container">
                    <FontAwesomeIcon icon={this.props.icon} />
                </div>
                <div class="bullet-container">
                    <small class="active-bullet">&bull;</small>
                </div>
            </Link>
        );
    }

    changePage() {

    }
}