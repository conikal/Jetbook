<template>
	<div>
		<div :class="'flight-item ' + itemClass">
			<collapse :selected="false">
				<div slot="collapse-header">
					<el-row :gutter="5" type="flex" align="middle" justify="center">
						<el-col :span="5" align="middle">
							<div class="flight-price">{{ price }}</div>
						</el-col>
						<el-col :span="18">
							<a href="#">
								<el-row>
									<info :info="routeDepart"></info>
									<info v-if="routeReturn.length !== 0" :info="routeReturn" class="info-return"></info>
								</el-row>
							</a>
						</el-col>
						<el-col :span="1" align="middle">
							<a href="#"><i class="el-icon-chevron-down"></i></a>
						</el-col>
					</el-row>
				</div>

				<div slot="collapse-body">
					<el-row :gutter="40" type="flex" class="flight-detail">
						<el-col :span="12" class="routes-depart">
							<el-row class="routes-header">
								<el-col :span="16">
									Depart: 
									<strong>{{ item.flyFrom}} <i class="el-icon-arrow-right-c"></i> {{ item.flyTo }}</strong>
								</el-col>
								<el-col :span="8" align="end">
									<i class="el-icon-clock"></i> {{ durationDepart }}
								</el-col>
							</el-row>
							<route :data="routeDepart"></route>
						</el-col>
						<el-col v-if="routeReturn.length !== 0" :span="12" class="routes-return">
							<el-row v-if="durationReturn !== false" class="routes-header">
								<el-col :span="16">
									Return: 
									<strong>{{ item.flyTo }} <i class="el-icon-arrow-right-c"></i> {{ item.flyFrom }}</strong>
								</el-col>
								<el-col :span="8" align="end">
									<i class="el-icon-clock"></i> {{ durationReturn }}
								</el-col>
							</el-row>
							<route :data="routeReturn"></route>
						</el-col>
						<el-col v-else :span="12" align="middle" justify="center">
							<br/>
							<h3 class="flight-price">{{ price }}</h3>
							<a :href="item.deep_link" target="_blank">
								<el-button type="primary" size="large">Book flight</el-button>
							</a>
						</el-col>
					</el-row>
					<el-row v-if="routeReturn.length !== 0">
						<el-col  :span="6" align="start">
							<a :href="item.deep_link" target="_blank">
								<el-button
									type="primary"
									size="large"
									class="fluid">
									Book this flight for {{ price }}
								</el-button>
							</a>
						</el-col>
						<el-col  :span="18" align="end">
							<div class="flight-price">{{ price }}</div>
						</el-col>
					</el-row>
				</div>
			</collapse>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import numeral from 'numeral'
import Route from './Route.vue'
import Info from './Info.vue'
import Collapse from './Collapse.vue'

function durationFly(start, end) {
	let depart = moment.unix(start)
  let arrive = moment.unix(end)
  let different = arrive.diff(depart)
  let duration = moment.duration(different)
  return Math.floor(duration.asHours()) + 'h ' + moment.utc(different).format("mm") + 'm';
}

export default {
	name: 'flight-item',
	props: {
		index: Number,
		id: String,
		item: Object
	},
	components: { Route, Info, Collapse },
	computed: {
		itemClass() {
			if ( (this.index % 2) == 0) {
				return 'item-light'
			} else {
				return 'item-grey'
			}
		},
		price() {
			return numeral(this.item.price).format('$0,0')
		},
		routeDepart() {
			return this.item.route.filter((route) => route.return === 0)
		},
		routeReturn() {
			return this.item.route.filter((route) => route.return === 1)
		},
		durationDepart() {
			let start = this.item.dTimeUTC
			let end = this.item.aTimeUTC
			return durationFly(start, end)
		},
		durationReturn() {
			if (this.routeReturn.length !== 0) {
				let endIndex = this.routeReturn.length - 1;
				let start = this.routeReturn[0].dTimeUTC
				let end = this.routeReturn[endIndex].aTimeUTC
				return durationFly(start, end)
			} else {
				return false
			}
		}
	}
}
</script>

<style>
.flight-item:hover {
	border-left: 3px solid #13CE66;
}
.item-light {
	padding: 15px;
	border-left: 3px solid #fff;
}
.item-grey {
	border-left: 3px solid #EFF2F7;
	border-top: 1px solid #EFF2F7;
	border-bottom: 1px solid #EFF2F7;
	padding: 15px;
	background-color: #F9FAFC
}
.info-return {
	border-top: #D3DCE6 2px dotted;
	padding-top: 10px;
	margin-top: 15px
}

.flight-detail {
	background-color: #F9FAFC;
	margin-top: 15px;
	margin-left: -15px !important;
	padding: 25px 10px;
}

.flight-price {
	font-weight: bold;
	font-size: 23px;
	color: #13CE66;
}

.routes-header {
	padding-bottom: 15px;
	margin-bottom: 15px;
	border-bottom: #E5E9F2 1px solid;
}
.routes-depart {
	border-right: #E5E9F2 1px solid;
}
.routes-return {
	margin-left: -1px;
	border-left: #E5E9F2 1px solid;
}
</style>