import React from "react";
import { connect } from "react-redux";

class DataFetcherComponent extends React.Component {
	render() {
		if (this.props.loading) {
			return <div>
				Loading..
			</div>
		} else {
			return (
				<div>
					<button onClick={() => {
						this.props.getUsersRequest();
					}} >Get Data From API</button>
					{this.props.users.length === 0 ?
						<div>
							<p>No Users</p>
						</div> :
						<div>
							{this.props.users.map((user, index) => {
								return <p key={index}>{user.login}</p>
							})}
						</div>}
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	// console.log("State =>", state);
	return {
		loading: state.gettingData,
		users: state.users,
		error: state.error
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getUsersRequest: () => {
			dispatch({
				type: 'GET_DATA_REQUEST'
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFetcherComponent);