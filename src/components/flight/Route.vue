<template>
	<div>
		<div v-for="(route, index) in routeFlight" class="timeline">
      <div v-if="index !== 0" class="timeline-stop">
        <i class="el-icon-shuffle"></i> Layover in {{ route.cityFrom }} for {{ route.layoverTime }}
      </div>
      <div class="route">
        <div class="timeline-time">
          <div class="depart-time">{{ route.departTime }}</div>
          <div class="arrive-time">{{ route.arriveTime }}</div>
        </div>
        <div class="timeline-content">
          <div class="timeline-start">
            <strong>{{ route.cityFrom }}</strong> <span class="airport-code"> - {{ route.flyFrom }}</span>
            <div class="depart-date">
              {{ route.departDate }}
            </div>
          </div>
          <div class="timeline-logo">
            <img :src="'http://images.kiwi.com/airlines/16/' + route.airline + '.png'" >
          </div>
          <p class="timeline-duration"><i class="mdi mdi-clock"></i>
            {{ route.durationTime }} - {{ route.airline + ' ' + route.flight_no }}
          </p>
          <div class="timeline-end">
            <strong>{{ route.cityTo }}</strong> <span class="airport-code"> - {{ route.flyTo }}</span>
            <div class="arrive-date">
              {{ route.arriveDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
  name: 'flight-route',
	props: {
    data: Array
	},
  computed: {
    routeFlight() {
      let result = []

      this.data.map((route, id) => {
        let layoverTime = ''

        // Time formated
        let departTime    = moment.unix(route.dTimeUTC).format('HH:mm')
        let arriveTime    = moment.unix(route.aTimeUTC).format('HH:mm')
        let departDate    = moment.unix(route.dTimeUTC).format('ddd DD MMM')
        let arriveDate    = moment.unix(route.aTimeUTC).format('ddd DD MMM')
        let durationTime  = durationFly(route.dTimeUTC, route.aTimeUTC)

        // Layover Time
        if ( id > 0) {
          let beforeIndex = id - 1;
          let beforeTime  = this.data[beforeIndex].aTimeUTC
          let afterTime   = route.dTimeUTC
              layoverTime = durationFly(beforeTime, afterTime)
        }

        // Push Layover Time and formated time
        route.departTime   = departTime
        route.arriveTime   = arriveTime
        route.departDate   = departDate
        route.arriveDate   = arriveDate
        route.durationTime = durationTime
        route.layoverTime  = layoverTime

        result.push(route)        
      })

      return result
    }
  }
}
</script>

<style>
  
.timeline {
  list-style: none;
}
.timeline > li {
  margin-bottom: 60px;
}

/* for Desktop */
@media ( min-width : 640px ){
  .timeline .route {
    overflow: hidden;
    margin: 0;
    position: relative;
  }
  .timeline-time {
    width: 60.5px;
    float: left;
  }
  .timeline-time .depart-time {
    top: 0px;
    margin-top: -3px;
  }
  .timeline-time .arrive-time {
    position: absolute;
    bottom: -3px;
  }
  .timeline-content {
    width: 75%;
    float: left;
    border-left: 2px #E5E9F2 solid;
    padding-left: 30px;
  }
  .timeline-content .airport-code {
    color: #8492A6;
  }
  .timeline-content .timeline-start {
    top: 0;
    margin-top: -3px;
  }
  .timeline-content .timeline-start .depart-date {
    float: right;
    font-size: 13px;
    line-height: 18px;
    color: #8492A6;
  }
  .timeline-content .timeline-start:before {
    content: '';
    width: 10px;
    height: 10px;
    background: #D3DCE6;
    position: absolute;
    left: 56px;
    top: 0;
    border-radius: 100%;
  }
  .timeline-content .timeline-end {
    bottom: -3px
  }
  .timeline-content .timeline-end .arrive-date {
    float: right;
    font-size: 13px;
    line-height: 18px;
    color: #8492A6;
  }
  .timeline-content .timeline-end:after {
    content: '';
    width: 10px;
    height: 10px;
    background: #D3DCE6;
    position: absolute;
    left: 56px;
    bottom: 0;
    border-radius: 100%;
  }
  .timeline-logo {
    position: absolute;
    left: 53px;
    top: 40%;
  }
  .timeline-duration {
    font-size: 13px;
    color: #8492A6;
    line-height: 18px;
  }
  .timeline-stop {
    height: 50px;
    width: 75%;
    font-size: 13px;
    color: #8492A6;
    border-left: 2px #E5E9F2 dotted;
    padding-left: 30px;
    margin-left: 60.5px;
    padding-top: 25px;
  }
}
</style>
