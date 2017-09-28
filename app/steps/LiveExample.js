import React, { Component } from "react";
import {
	ReactiveBase,
	DateRange,
	NumberBox,
	RangeSlider,
	ResultCard
} from "@appbaseio/reactivesearch";
import { dataOperation } from "../service/DataOperation";
import moment from "moment";

require("./styles.scss");

export class LiveExample extends Component {
	onData(res) {
		return {
			image: res.image,
			title: res.name,
			desc: (
				<div>
					<div className="price">${res.price}</div>
					<span className="host" style={{"backgroundImage": `url(${res.host_image})`}}></span>
					<p>{res.room_type} · {res.accommodates} guests</p>
				</div>
			),
			url: res.listing_url
		};
	}

	render() {
		return (
			<div className="row" style={{"margin": "0"}}>
				<ReactiveBase
					app="housing"
					credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
					type="listing"
					theme="rbc-red"
				>
					<nav>
						<a href="/examples/airbeds" className="brand">Airbeds</a>
					</nav>

					<div className="sensor-wrapper clearfix">
						<DateRange
							dataField={["date_from", "date_to"]}
							componentId="DateRangeSensor"
							title="When"
							numberOfMonths={1}
							queryFormat="basic_date"
							extra={{
								initialVisibleMonth: () => moment("2017-04-01")
							}}
						/>

						<NumberBox
							componentId="GuestSensor"
							dataField="accommodates"
							title="Guests"
							defaultSelected={2}
							data={{
								start: 1,
								end: 16
							}}
						/>
					</div>

					<div className="row result-wrapper clearfix">
						<div className="col s12">
							<div className="row">
								<ResultCard
									componentId="SearchResult"
									dataField="name"
									from={0}
									size={12}
									onData={this.onData}
									pagination={true}
									react={{
										and: ["DateRangeSensor", "GuestSensor", "PriceSensor"]
									}}
								/>
							</div>
						</div>
					</div>
				</ReactiveBase>
			</div>
		);
	}
}
