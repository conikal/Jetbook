<template>
	<div>
		<div class="bg-primary" style="height: 315px">
			<div class="container">
				<hero v-if="flights" :flight="flights.data[1]" :search="searchParams"></hero>
			</div>
		</div>
		<div class="container">
				<spinner :show="!flights"></spinner>
				<el-row v-if="flights" :gutter="20">
					<el-col :span="18">
						<el-card class="box-card">
						<item v-for="(item, index) in flights.data"
							:key="index"
							:index="index"
							:id="item.id"
							:item="item"></item>
						</el-card>
					</el-col>
					<el-col :span="6">
						<flight-filter :search="searchParams"></flight-filter>
					</el-col>
				</el-row>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import Item from '../components/flight/Item.vue'
import Spinner from '../components/Spinner.vue'
import Hero from '../components/flight/Hero.vue'
import FlightFilter from '../components/flight/Filter.vue'

function dateReplace(date) {
  return moment(date).format('DD/MM/YYYY')
}

function fetchFlight (store) {
	// search params from router
	const paramsRoute = store.state.route.params

	// reset set params search flights
	const params = {
		typeFlight: paramsRoute.typeFlight,
		flyFrom: paramsRoute.flyFrom,
		to: paramsRoute.flyTo,
		dateFrom: dateReplace(paramsRoute.dateFrom),
		dateTo: dateReplace(paramsRoute.dateTo),
		returnFrom: dateReplace(paramsRoute.returnFrom),
		returnTo: dateReplace(paramsRoute.returnTo),
		adults: paramsRoute.adults,
		children: paramsRoute.children,
		infants: paramsRoute.infants,
		sort: 'quality'
	}

	store.dispatch('setParams', params)
	store.dispatch('getFlights', {params: params, filter: false})
}

export default {
	name: 'flight-results',
	components: { Spinner, Item, Hero, FlightFilter },
	data() {
		return {
			transition: 'slide-up',
			search: this.$store.state.route.params
		}
	},
	computed: {
		flights() {
			return this.$store.state.flight.results
		},
		searchParams() {
			return this.$store.state.route.params
		},
	},
	preFetch: fetchFlight,
	beforeMount() {
		fetchFlight(this.$store)
	}
}
</script>

<style>
	.box-card {
  	margin-bottom: 15px;
  	margin-top: -80px;
  }
  .box-card .el-card__body {
  	padding: 0 !important;
  }
</style>