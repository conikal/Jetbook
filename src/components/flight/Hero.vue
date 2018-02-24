<template>
	<div>
		<el-form ref="filterFlight" v-model="filter">
		<el-col :span="18">

			<!-- info search flight -->
			<el-row type="flex" justify="center" align="middle" class="route-info">
				<el-col :span="6" align="start">
					<div class="airport"><span>{{ flight.flyFrom }}</span></div>
					<div class="city">{{ flight.cityFrom }}, {{ flight.countryFrom.code }}</div>
				</el-col>
				<el-col :span="12" align="middle">
					<div class="plane"></div>
				</el-col>
				<el-col :span="6" align="end">
					<div class="airport"><span>{{ flight.flyTo }}</span></div>
					<div class="city">{{ flight.cityTo }}, {{ flight.countryTo.code }}</div>
				</el-col>
			</el-row>
			<div class="route-distance">{{ distance }} km</div>
			
			<!-- SEARCH EDIT -->
			<el-row type="flex" class="search-info">
				
				<!-- date edit -->
				<el-col :span="16">
					<el-date-picker
			            v-model="departDate"
			            @change="handleDepart"
			            :picker-options="quickPicker"
			            :editable="false"
			            format="ddd, dd MMM yyyy"
			            class="date"
			            placeholder="Depart date">
			          </el-date-picker>
			          <i class="el-icon-arrow-swap"></i>
			          <el-date-picker
			            v-model="returnDate"
			            @change="handleReturn"
			            :picker-options="returnPicker"
			            :editable="false"
			            format="ddd, dd MMM yyyy"
			            class="date"
			            style="margin-left: 15px"
			            placeholder="None return">
			    </el-date-picker>
				</el-col>

				<el-col :span="8" align="end">
					<!-- stops edit -->
					<el-dropdown
						@command="handleStops"
						trigger="click"
						style="margin-right: 20px;">
					  <el-button type="text" class="el-dropdown-link">
					    <i :class="stopButton.icon"></i> {{ stopButton.label }}
					  </el-button>
					  <el-dropdown-menu slot="dropdown">
					    <el-dropdown-item v-for="stop in stopsData" :key="stop.id" :command="stop.value">
					    	<i :class="stop.icon"></i> {{ stop.label }}
					    </el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>

					<!-- passenger edit -->
					<el-popover
					  ref="passenger"
					  placement="bottom-end"
					  width="250"
					  trigger="click">
					  <el-form-item label="Adult:" label-width="100px" label-position="left">
              <el-input-number
                class="fluid"
                v-model="filter.passenger.adults"
                @change="handleAdults"
                :min="1"
                :max="10">
              </el-input-number>
            </el-form-item>
            <el-form-item label="Children:" label-width="100px" label-position="left">
              <el-input-number
                class="fluid"
                v-model="filter.passenger.children"
                @change="handleChildren"
                :min="0"
                :max="10">
              </el-input-number>
            </el-form-item>
            <el-form-item label="Infant:" label-width="100px" label-position="left">
              <el-input-number
                class="fluid"
                v-model="filter.passenger.infants"
                @change="handleInfants"
                :min="0"
                :max="maxInfants">
              </el-input-number>
            </el-form-item>
					</el-popover>
					<el-button type="text" v-popover:passenger>
						<i class="el-icon-person-stalker"></i>
						{{ passenger }} Passenger
					</el-button>
				</el-col>
			</el-row>
		</el-col>
		</el-form>
		<el-col :span="6">
			
		</el-col>
	</div>
</template>

<script>
import moment from 'moment'
import numeral from 'numeral'

function fetchFlight (store, params, condition) {
	if (condition !== false) store.dispatch('addParams', condition)
	store.dispatch('getFlights', {params: params, filter: true})
}

const stopOptions = [{
		value: 'any',
		label: 'Any Stops',
		icon: 'el-icon-android-done-all'
	}, {
		value: '0',
	 	label: 'Non-Stop',
	 	icon: 'mdi mdi-airplane-takeoff'
	}, {
		value: '1',
		label: 'Max 1 Stops',
		icon: 'mdi mdi-numeric-1-box-outline'
	}, {
		value: '2',
		label: 'Max 2 Stops',
		icon: 'mdi mdi-numeric-2-box-outline'
	}];

export default {
	name: 'flight-hero',
	props: {
		flight: Object,
		search: Object,
	},
	data() {
		return {
			departDate: moment(this.search.dateFrom),
			returnDate: this.search.typeFlight == 'oneway' ? '' : moment(this.search.returnFrom),
			filter: {
				passenger: {
					adults: this.search.adults,
					children: this.search.children,
					infants: this.search.infants
				}
			},
			stops: 'any',
			stopsData: stopOptions,
			quickPicker: {
				disabledDate (time) {
          return time.getTime() < moment().subtract(1, 'day')
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Tomorrow',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'Next week',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      returnPicker: {
      	disabledDate (time) {
          return time.getTime() < moment().add(0, 'day')        },
      	shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Tomorrow',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'Next week',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
	        text: 'No return',
	        onClick(picker) {
	          picker.$emit('pick', '');
	        }
	      }]
      },
		}
	},
	computed: {
		distance() {
			let result = Math.floor(this.flight.distance *  1.609344)
					result = numeral(result).format('0,0')
			
			return result
		},
		stopButton() {
			let selected = {}
			this.stopsData.forEach((stop, id) => {
				if (stop.value == this.stops) {
						selected = stop
				}
			})
			return selected
		},
		passenger() {
			const ps = this.filter.passenger
			return ps.adults + ps.children + ps.infants
		},
		flightDepart() {
			return this.flights.route.filter((route) => route.return === 0)
		},
		flightReturn() {
			return this.flights.route.filter((route) => route.return === 1)
		},
    searchParams() {
    	return this.$store.state.flight.params
    },
    maxInfants() {
    	return parseInt(this.filter.passenger.adults)
    }
	},
	methods: {
		handleDepart(date) {
			const dateFrom = moment(this.departDate).format('DD/MM/YYYY')
			fetchFlight(this.$store, this.searchParams, {dateFrom: dateFrom, dateTo: dateFrom} )
		},
		handleReturn(date) {
			if (date) {
				const returnFrom = moment(this.returnDate).format('DD/MM/YYYY')
				const condition = {typeFlight: 'round', returnFrom: returnFrom, returnTo: returnFrom}
				fetchFlight(this.$store, this.searchParams, condition)
			} else {
				fetchFlight(this.$store, this.searchParams, {typeFlight: 'oneway'} )
			}
		},
		handleStops(command) {
      this.stops = command
      if (command === 'any') {
      	this.$store.dispatch('delParams', 'maxstopovers')
      	fetchFlight(this.$store, this.searchParams, false)
      } else {
	      const condition = {maxstopovers: this.stops}
				fetchFlight(this.$store, this.searchParams, condition)
			}
    },
    handleAdults(adults) {
    	const condition = {adults: adults}
    	fetchFlight(this.$store, this.searchParams, condition)
    },
    handleChildren(children) {
    	const condition = {children: children}
    	fetchFlight(this.$store, this.searchParams, condition)
    },
    handleInfants(infants) {
    	const condition = {infants: infants}
    	fetchFlight(this.$store, this.searchParams, condition)
    }
	}
}
</script>

<style>
.route-distance {
  max-width: 430px;
  margin: -14px auto 0 auto;
  text-align: center;
  font-size: 14px;
  color: #fff;
  position: relative;
  z-index: 4;
}
.route-info {
	padding-top: 60px;
}
.route-info:after {
	content: '';
  width: 100%;
  height: 2px;
  position: absolute;
  top: 93px;
  display: block;
  border-bottom: 2px #fff dotted;
  z-index: 0;
}
.route-info .airport span {
	font-size: 46px;
	color: #fff;
	background-color: #20A0FF;
	z-index: 2;
	position: relative;
	padding: 0 10px;
}
.route-info .city {
	color: #fff;
	font-size: 14px;
	line-height: 10px;
	padding: 0 10px;
}
.route-info .plane {
	width: 40px;
	height: 40px;
	background-color: #20A0FF;
	padding: 0 20px;
	z-index: 2;
	position: relative;
  display: block;
  background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNTEwIDUxMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEwIDUxMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJmbGlnaHRzIj4KCQk8cGF0aCBkPSJNNTEwLDI1NWMwLTIwLjQtMTcuODUtMzguMjUtMzguMjUtMzguMjVIMzMxLjVMMjA0LDEyLjc1aC01MWw2My43NSwyMDRINzYuNWwtMzguMjUtNTFIMEwyNS41LDI1NUwwLDM0NC4yNWgzOC4yNSAgICBsMzguMjUtNTFoMTQwLjI1bC02My43NSwyMDRoNTFsMTI3LjUtMjA0aDE0MC4yNUM0OTIuMTUsMjkzLjI1LDUxMCwyNzUuNCw1MTAsMjU1eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=');
  background-size: 50% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.search-info {
	margin-top: 55px;
  padding: 10px;
	color: #fff;
}
.search-info button, .search-info button:hover, .search-info button:focus {
	color: #fff
}
.search-info .date {
	width: 125px;
}
.search-info .date input {
	color: #fff;
	border: 0px;
	background-color: #20A0FF !important;
	padding: 0px;
}
.search-info .date input::-webkit-input-placeholder {
	color: #fff !important;
}
.search-info .date input:-moz-placeholder { /* Firefox 18- */
	color: #fff !important;  
}
.search-info .date input::-moz-placeholder {  /* Firefox 19+ */
	color: #fff !important;  
}
.search-info .date input:-ms-input-placeholder {  
	color: #fff !important;  
}
.search-info .date .el-input__icon {
	display: none;
}
</style>