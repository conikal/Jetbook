<template>
	<div>
		<el-row>
			<el-col :span="2" align="middle" class="airline-logo">
				<div 
					v-for="(logo, index) in logoAirlines"
					v-if="index < 2">
					<img 
						v-if="logoAirlines.length > 1"
					 :src="logo.src"
					 :alt="logo.name"
					 :class="'logo logo-' + index" />
					 <img v-else
					 :src="logo.src"
					 :alt="logo.name"
					 class="logo single" />
				</div>
			</el-col>
			<el-col :span="22">
				<div class="flight-info">
			    <div class="segments">
			      <div class="segment departure">
			        <time>
			        	{{ firstFly.departTime }}
			        </time>
			        <span class="airport">
			        	{{ firstFly.flyFrom }}
			        </span>
			      </div>
			      <template 
			      	v-for="(route, index) in info" 
			      	v-if="index !== 0">
				      <div class="divider">
				      	<span class="plane"></span>
				      </div>
				      <div class="segment adaptive">
				        <span class="airport">
				        	{{ route.flyFrom }}
				        </span>
				      </div>
			      </template>
			      <div class="divider adaptive">
			      	<span class="plane"></span>
			      </div>
			      <div class="segment destination">
			        <time>
			        	{{ lastFly.arriveTime }}
			        </time>
			        <span class="airport">
			        	{{ lastFly.flyTo }}
			        </span>
			      </div>
			    </div>
			  </div>
			  <div class="flight-duration">
			  	<span v-if="stops === 0">
						Direct flight in {{ duration }}
					</span>
					<span v-else>
						{{ stops }} stops in {{ duration }}
					</span>  
			  </div>
			</el-col>
		</el-row>
  </div>
</template>

<script>
import moment from 'moment'

function durationFly(start, end) {
	let depart = moment.unix(start)
  let arrive = moment.unix(end)
  let different = arrive.diff(depart)
  let duration = moment.duration(different)
  return Math.floor(duration.asHours()) + 'h ' + moment.utc(different).format("mm") + 'm';
}

export default {
	name: 'flight-info',
	props: {
		info: Array
	},
	computed: {
		logoAirlines() {
			let airlines = [];
			let srcImg = '';
			let logos = [];

			// take airline name from route
			this.info.map(item => { airlines.push(item.airline) })

			// remove duplicate airline
			airlines = airlines.filter((item, index, arr) => {
				return arr.indexOf(item) == index;
			});

			// add object include logo and name airline
			airlines.map(brand => {
				srcImg = 'http://images.kiwi.com/airlines/32/' + brand + '.png';
				logos.push({name: brand, src: srcImg})
			});

			return logos
		},
		firstFly() {
			let firstFly = this.info[0]
			let departTime = moment.unix(firstFly.dTimeUTC).format('HH:mm')
			firstFly.departTime = departTime
			return firstFly
		},
		lastFly() {
			let index = this.info.length - 1;
			let lastFly = this.info[index]
			let arriveTime = moment.unix(lastFly.aTimeUTC).format('HH:mm')
			lastFly.arriveTime = arriveTime
			return lastFly
		},
		duration() {
			let endIndex = this.info.length - 1;
			let start = this.info[0].dTimeUTC
			let end = this.info[endIndex].aTimeUTC
			return durationFly(start, end)
		},
		stops() {
			return this.info.length - 1
		}
	}
}
</script>

<style>
	.airline-logo .single {
		margin-top: 10px;
	}
	.airline-logo .logo {
		height: 32px;
		width: 32px;
		background-color: #EFF2F7;
		border-radius: 4px;
	}
	.airline-logo .logo-1 {
		margin-top: -15px;
		-webkit-box-shadow: 0px -1.5px 2px 0px rgba(132,146,166,0.69);
		-moz-box-shadow: 0px -1.5px 2px 0px rgba(132,146,166,0.69);
		box-shadow: 0px -1.5px 2px 0px rgba(132,146,166,0.69);
	}

	.flight-duration {
	  max-width: 430px;
	  margin: -14px auto 0 auto;
	  text-align: center;
	  font-size: 14px;
	  color: #8492A6;
	  position: relative;
	  z-index: 4;
	}

.flight-info {
  position: relative;
  display: table;
  width: 100%;
  table-layout: fixed;
  margin: 0 auto;
  border-collapse: collapse;
 }
.flight-info:after {
    content: '';
    width: 100%;
    height: 1.5px;
    position: absolute;
    top: 20px;
    display: block;
    background: #D3DCE6;
    z-index: 0;
  }
  
	.flight-info .segments {
    display: table-row;
  	}
  .flight-info .segments div {
      display: table-cell;
      text-align: center;
      position: relative;
    }
    
   	.flight-info .segments .airport {
      display: block;
      line-height: 10px;
      font-size: 14px;
      color: #8492A6;
      }
    .flight-info .segments .airport:only-child {
      line-height: 40px;
    }
    
    .flight-info .segments .plane {
      width: 36px;
      height: 36px;
      position: absolute;
      display: block;
      left: 50%;
      transform: translateX(-50%);
      top: 2px;
	    background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iZmxpZ2h0cyI+CgkJPHBhdGggZD0iTTUxMCwyNTVjMC0yMC40LTE3Ljg1LTM4LjI1LTM4LjI1LTM4LjI1SDMzMS41TDIwNCwxMi43NWgtNTFsNjMuNzUsMjA0SDc2LjVsLTM4LjI1LTUxSDBMMjUuNSwyNTVMMCwzNDQuMjVoMzguMjUgICAgbDM4LjI1LTUxaDE0MC4yNWwtNjMuNzUsMjA0aDUxbDEyNy41LTIwNGgxNDAuMjVDNDkyLjE1LDI5My4yNSw1MTAsMjc1LjQsNTEwLDI1NXoiIGZpbGw9IiNkM2RjZTYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K');
	    background-size: 50% 100%;
	    background-position: center;
	    background-repeat: no-repeat;
      z-index: 2;
    }
    
    .flight-info .segments time {
      font-size: 22px;
      line-height: 36px;
    }
    
    .flight-info .segments .segment {
      width: 60px;
      position: relative;
      z-index: 3;
      padding: 0;
    }

    .item-light .flight-info .segments .segment, .item-light .flight-info .segments .plane {
    	background-color: #fff;
    }

    .item-grey .flight-info .segments .segment, .item-grey .flight-info .segments .plane {
    	background-color: #F9FAFC;
    }
    
    .flight-info .segments .departure {
      padding: 0 8px 0 0;
    }
    .flight-info .segments .destination {
      padding: 0 0 0 8px;
    }
  
@media screen and (max-width: 39.9375em) {
  .adaptive {
    display: none !important;
  }
}

@media screen and (max-width: 20em) {
  
  .flight-duration {
    display: none !important;
  }
}

@media screen and (max-width: 15em) {
  .flight-info:after {
    display: none !important;
  }
}
@media screen and (min-width: 16em) {
  .flight-info:after {
    display: block !important;
  }
}
</style>