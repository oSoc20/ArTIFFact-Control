import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { SidebarAction, setActiveItem } from '../../actions/SidebarAction';

export interface Props {
    activeItem: string;
    setActiveItem: (value: string) => any;
}

const Sidebar: React.FunctionComponent<Props> = ({ activeItem, setActiveItem }) => (
    <>
        <p>{activeItem}</p>
        <p>
            <button onClick={() => setActiveItem("dashboard")}>
                Dashboard
            </button>
        </p>
        <p>
            <button onClick={() => setActiveItem("fileChecks")}>
                File checks
            </button>
        </p>
    </>
);

const mapStateToProps = (state: RootState) => ({
    activeItem: state.sidebar.activeItem
});

const mapDispatchToProps = (dispatch: Dispatch<SidebarAction>) => ({
    setActiveItem: (value: string) => dispatch(setActiveItem(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
