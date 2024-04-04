import "./NavigationBarButton.sass";

import { Component } from "preact";
import * as icons from "react-bootstrap-icons";

import { Icon } from "../../UtilityElements/UtilityElements";

interface ComProps {
    title: string;
    relativeLink: string;
    iconName: keyof typeof icons;
}

interface ComState {
    active: boolean;
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
            <a href={props.relativeLink} class={`row align-items-center nav-button ${this.state.active ? 'active' : ''}`}>
                <div class='col'>
                    <div class='row icon-container'>
                        <div class='col'>
                            <Icon iconName={this.props.iconName} />
                        </div>
                    </div>
                    <div class='row justify-content-center bullet-container'>
                        <div class='col-auto'>
                            <small class='active-bullet'>&bull;</small>
                        </div>
                    </div>
                </div>
            </a>
        );
    }

    changePage() {

    }
}