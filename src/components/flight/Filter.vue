<template>
	<div>
		<!-- sort flights -->
		<div class="filter-sort">
			<div v-for="option in sortOptions">
				<input
					type="radio"
					v-model="sort"
					@click="handleSort"
					:value="option.value"
					:id="option.value"
					class="radio"/>
					<label :for="option.value">
						<i :class="option.icon"></i> {{ option.label }}
					</label>
			</div>
		</div>

		<!-- Duration filter -->
		<div class="block">
			<span>Duration</span>
			<el-slider 
				v-model="duration"
				:max="60">
				</el-slider>
		</div>

		<!-- Stopover filter -->
		<div class="block">
			<span>Stopover time</span>
	    <el-slider
	      v-model="stopover"
	      range
	      :max="25">
	    </el-slider>
	  </div>

	  <!-- Departure options time -->
	  <div class="block">
	  	<p>Departure</p>

	  	<el-row type="flex">
	  		<el-col :span="10">
	  			<span v-if="typeDepart == 'takeoff'">{{ departTime[0] }} - {{ departTime[1] }}</span>
	  			<span v-else>{{ arriveTime[0] }} - {{ arriveTime[1] }}</span>
	  		</el-col>
	  		<el-col :span="14" align="end">
				  <el-radio-group v-model="typeDepart" size="mini">
					  <el-radio-button label="takeoff">Take-off</el-radio-button>
					  <el-radio-button label="landing">Landing</el-radio-button>
					</el-radio-group>
				</el-col>
			</el-row>

			<el-slider
				v-if="typeDepart == 'takeoff'"
	      v-model="dtime"
	      @change="handleDepartTime"
	      range
	      :max="23">
	    </el-slider>
	    <el-slider
				v-else
	      v-model="atime"
	      @change="handleArriveTime"
	      range
	      :max="23">
	    </el-slider>

	    <!-- Departure Fly days -->
		  <div class="fly-days">
		  	<el-checkbox-group v-model="flyDays" @change="handleFlyDays" size="mini">
			    <el-checkbox v-for="(day, id) in flyDaysOptions" :key="id" :label="day.value">{{ day.label }}</el-checkbox>
			  </el-checkbox-group>
		  </div>
		</div>

		<!-- Return options time -->
	  <div class="block">
	  	<p>Return</p>

	  	<el-row type="flex">
	  		<el-col :span="10">
	  			<span v-if="typeReturn == 'takeoff'">{{ returnDepartTime[0] }} - {{ returnDepartTime[1] }}</span>
	  			<span v-else>{{ returnArriveTime[0] }} - {{ returnArriveTime[1] }}</span>
	  		</el-col>
	  		<el-col :span="14" align="end">
				  <el-radio-group v-model="typeReturn" size="mini">
					  <el-radio-button label="takeoff">Take-off</el-radio-button>
					  <el-radio-button label="landing">Landing</el-radio-button>
					</el-radio-group>
				</el-col>
			</el-row>

			<el-slider
				v-if="typeReturn == 'takeoff'"
	      v-model="returndtime"
	      @change="handleReturnDepartTime"
	      range
	      :max="23">
	    </el-slider>
	    <el-slider
				v-else
	      v-model="returnatime"
	      @change="handleReturnArriveTime"
	      range
	      :max="23">
	    </el-slider>

	    <!-- Return Fly days -->
		  <div class="fly-days">
		  	<el-checkbox-group v-model="returnFlyDays" @change="handleReturnFlyDays" size="mini">
			    <el-checkbox v-for="(day, id) in returnFlyDaysOptions" :key="id" :label="day.value">{{ day.label }}</el-checkbox>
			  </el-checkbox-group>
		  </div>
		</div>

	  
	</div>
</template>

<script>
import moment from 'moment'

function fetchFlight (store, params, condition) {
	store.dispatch('addParams', condition)
	store.dispatch('getFlights', {params: params, filter: true})
}

const flydayData = [ 
	{	value: 0, label: 'Su' },
	{ value: 1, label: 'Mo' },
	{ value: 2, label: 'Tu' },
	{ value: 3, label: 'We' },
	{ value: 4, label: 'Th' },
	{ value: 5, label: 'Fr' },
	{ value: 6, label: 'Sa'}];

const sortData = [
	{ value: 'quality', label: 'Recommend', icon: 'el-icon-thumbsup' },
	{ value: 'cheapest', label: 'Cheapest', icon: 'el-icon-social-usd' },
	{ value: 'shortest', label: 'Shortest', icon: 'el-icon-time' }];

export default {
	name: 'filter-sort',
	props: {
		search: Object
	},
	data() {
		return {
			sort: 'quality',
			sortOptions: sortData,
			stops: 'any',
			duration: 60,
			stopover: [0, 25],
			typeDepart: 'takeoff',
			dtime: [0, 23],
			atime: [0, 23],
			flyDays: [0, 1, 2, 3, 4, 5, 6],
			flyDaysOptions: flydayData,
			typeReturn: 'takeoff',
			returndtime: [0, 23],
			returnatime: [0, 23],
			returnFlyDays: [0, 1, 2, 3, 4, 5, 6],
			returnFlyDaysOptions: flydayData
		}
	},
	computed: {
		searchParams() {
    	return this.$store.state.flight.params
    },
    departTime() {
    	return this.dtime.map((time) => {
    		return time + ':00'
    	})
    },
    arriveTime() {
    	return this.atime.map((time) => {
    		return time + ':00'
    	})
    },
    returnDepartTime() {
    	return this.returndtime.map((time) => {
    		return time + ':00'
    	})
    },
    returnArriveTime() {
    	return this.returnatime.map((time) => {
    		return time + ':00'
    	})
    }
	},
	methods: {
		handleFlyDays(days) {
			console.log(days)
		},
		handleReturnFlyDays(days) {
			console.log(days)
		},
		handleSort(event) {
			fetchFlight(this.$store, this.searchParams, {sort: this.sort} )
		},
		handleDepartTime(time) {
			const condition = { dtimefrom: this.departTime[0], dtimeto: this.departTime[1] }
			fetchFlight(this.$store, this.searchParams, condition)
		},
		handleArriveTime(time) {
			const condition =  { atimefrom: this.arriveTime[0], atimeto: this.arriveTime[1] }
			fetchFlight(this.$store, this.searchParams, condition)
		},
		handleReturnDepartTime(time) {
			const condition =  {returndtimefrom: this.returnDepartTime[0], returndtimeto: this.returnDepartTime[1]}
			fetchFlight(this.$store, this.searchParams, condition)
		},
		handleReturnArriveTime(time) {
			const condition = {returnatimefrom: this.returnArriveTime[0], returnatimeto: this.returnArriveTime[1]}
		}
	}
}
</script>

<style>
.filter-sort {
	height: 180px;
}
.filter-sort div {
	clear: both;
	margin: 0;
}

.filter-sort label {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #D1D3D4;
  padding: 5px 0;
}

/* hide input */
.filter-sort input.radio:empty {
	display: none;
}

/* style label */
.filter-sort input.radio:empty ~ label {
	position: relative;
	float: left;
	line-height: 34px;
	margin-top: 10px;
	padding-left: 15px;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.filter-sort input.radio:empty ~ label i {
	float: right;
	font-style: 16px;
	padding: 10px 15px 10px;
}
.filter-sort input.radio:not(:checked) ~ label {
	color: #8492A6;
	background-color: #F9FAFC;
}


.filter-sort input.radio:checked ~ label {
	color: #fff;
	background-color: #20A0FF;
	border: 1px solid #1D8CE0;
}

/* radio focus */
.filter-sort input.radio:focus ~ label:before {
	box-shadow: 0 0 0 3px #999;
}

/* filter stops */
.filter-stops {
	padding: 15px 0;
}

/* fly days */
.fly-days .el-checkbox__inner {
	height: 16px;
	width: 16px;
	border-radius: 2px;
}
.fly-days .el-checkbox__label {
	font-size: 11px;
}
.fly-days .el-checkbox+.el-checkbox {
	margin-left: 5px;
}
</style>