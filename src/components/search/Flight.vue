<template>
  <el-form ref="flightSearch" v-model="flightSearch">
    <el-form-item>
      <el-row :gutter="20">

        <!-- places search -->
        <el-col :span="8">
          <el-form-item label="From" label-position="top">
            <el-select
              v-model="flightSearch.flyFrom"
              clearable
              filterable
              remote
              size="large"
              prefix-icon="el-icon-location-outline"
              placeholder="City or airport from"
              class="fluid"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in places"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                <span style="float: left">{{ item.value }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">{{ item.parentId }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="To" label-position="top">
            <el-select
              v-model="flightSearch.flyTo"
              clearable
              filterable
              remote
              size="large"
              prefix-icon="el-icon-location-outline"
              placeholder="City or airport to"
              class="fluid"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in places"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- passenger select -->
        <el-col :span="8">
          <el-form-item label="Passenger" label-position="top">
            <el-popover
              ref="passenger"
              placement="bottom-end"
              width="330"
              trigger="click">
                <el-form-item label="Adult:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="flightSearch.passenger.adults"
                    :min="1"
                    :max="10">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Children:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="flightSearch.passenger.children"
                    :min="0"
                    :max="10">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Infant:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="flightSearch.passenger.infants"
                    :min="0"
                    :max="10">
                  </el-input-number>
                </el-form-item>
            </el-popover>
            <el-input
              v-model="totalPassenger"
              class="fluid"
              placeholder="Passenger"
              size="large"
              icon="person-stalker"
              v-popover:passenger>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">

        <!-- pick date -->
        <el-col :span="8">
          <el-form-item label="Depart" label-position="top">
            <el-date-picker
              v-model="departDate"
              :picker-options="quickPicker"
              :editable="false"
              @change="formatDate"
              size="large"
              format="dddd, dd MMM yyyy"
              class="fluid"
              placeholder="Pick a date depart">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Return" label-position="top">
            <el-date-picker
              v-model="returnDate"
              :picker-options="quickPicker"
              :disabled="disableReturn"
              :editable="false"
              @change="formatDate"
              size="large"
              format="dddd, dd MMM yyyy"
              class="fluid"
              placeholder="Pick a date return">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- class seat -->
        <el-col :span="8">
          <el-form-item label="Types" label-position="top">
            <el-row class="fluid">
              <el-col :span="12" class="text-left">
                <el-radio-group
                  v-model="flightSearch.typeFlight"
                  @change="handleType"
                  size="large">
                  <el-radio-button label="oneway">
                    <el-tooltip class="item" effect="dark" content="Oneway flights" placement="top">
                      <i class="el-icon-arrow-right-c"></i>
                    </el-tooltip>
                  </el-radio-button>
                  <el-radio-button label="round">
                    <el-tooltip class="item" effect="dark" content="Return flights" placement="top">
                      <i class="el-icon-arrow-return-left"></i>
                    </el-tooltip>
                  </el-radio-button>
                </el-radio-group>
              </el-col>
              <el-col :span="12" class="text-right">
                <router-link :to="'/flights/' + 
                  flightSearch.typeFlight + '/' +
                  flightSearch.flyFrom + '/' +
                  flightSearch.flyTo + '/' +
                  flightSearch.dateFrom + '/' +
                  flightSearch.dateFrom + '/' +
                  flightSearch.returnFrom + '/' +
                  flightSearch.returnFrom + '/' +
                  flightSearch.passenger.adults + '/' +
                  flightSearch.passenger.children + '/' +
                  flightSearch.passenger.infants">
                <el-button
                  type="primary"
                  icon="search"
                  size="large"
                  @click="submitSearch(flightSearch)">Search</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import moment from 'moment'

function currentDate(day) {
  return moment().add(day, 'day')
}

export default {
  name: 'flight-search',
  data() {
    return {
      departDate: currentDate(2),
      returnDate: currentDate(3),
      flightSearch: {
        typeFlight: 'oneway',
        flyFrom: 'london_gb',
        flyTo: 'paris_fr',
        dateFrom: currentDate(1),
        dateTo: '',
        returnFrom: currentDate(3),
        returnTo: '',
        passenger: {
          adults: 1,
          children: 0,
          infants: 0,
        }
      },
      quickPicker: {
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
          text: 'Next month',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', date);
          }
        }]
      },
      disableReturn: true,
      loading: false,
      places: [
        {id: 'london_gb', value: 'London', parentId: 'GB'},
        {id: 'paris_fr', value: 'Paris', parentId: 'FR'}
      ]
    }
  },
  computed: {
    totalPassenger() {
      let ps = this.flightSearch.passenger
      let result = ps.adults + ' Passenger'
      if ( ps.children > 0 ) { result += ', ' + ps.children + ' children' }
      if ( ps.infants > 0 ) { result += ', ' + ps.infants + ' infant' }
      return result
    },
    flightPlaces() {
      return this.$store.state.flight.places
    }
  },
  methods: {
    handleType(type) {
      if (type === 'oneway') {
        this.disableReturn = true
      } else {
        this.disableReturn = false
      }
    },
    remoteMethod(query) {

      // fetch data places
      this.$store.dispatch('getPlaces', {term: query, locale: 'vn'})

      // search place by query input
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.places = this.flightPlaces.filter(item => {
            return item.value.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 600);
      } else {
        this.places = [];
      }
    },
    formatDate(date) {
      // convert default date to short date
      this.flightSearch.dateFrom = moment(this.departDate).format('YYYYMMDD')
      this.flightSearch.returnFrom = moment(this.returnDate).format('YYYYMMDD')
    },
    submitSearch(flightSearch){
      let params = this.flightSearch

      this.flightSearch.dateFrom = moment(params.dateFrom).format('YYYYMMDD')
      this.flightSearch.returnFrom = moment(params.returnFrom).format('YYYYMMDD')
      // set return date when submit with oneway type
      if (params.typeFlight === 'oneway') {
        this.flightSearch.returnFrom = params.dateFrom
        this.flightSearch.returnTo = params.dateFrom
      }
    }
  }
}
</script>
