<template>
	<el-form ref="hotel" v-model="hotel">
		<el-form-item>
			<el-row :gutter="20">

				<!-- destination search -->
				<el-col :span="16">
					<el-form-item label="Where you want to go?" label-position="top">
						<el-autocomplete
					      class="fluid"
					      icon="search"
					      size="large"
					      v-model="destination"
					      :fetch-suggestions="querySearch"
					      placeholder="Destination, city, airport or hotel name"
					      @select="handleSelect"
					    ></el-autocomplete>
					  </el-form-item>
				</el-col>

				<!-- room and guest select -->
        <el-col :span="8">
          <el-form-item label="Room and Guest" label-position="top">
            <el-popover
              ref="guest"
              placement="bottom-end"
              width="330"
              trigger="click">
              	<el-form-item label="Room:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="room"
                    @change="handleChange"
                    :min="1"
                    :max="10">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Adult:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="guest.adult"
                    @change="handleChange"
                    :min="1"
                    :max="10">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="Children:" label-width="100px" label-position="left">
                  <el-input-number
                    class="fluid"
                    v-model="guest.child"
                    @change="handleChange"
                    :min="0"
                    :max="10">
                  </el-input-number>
                </el-form-item>
                
            </el-popover>
            <el-input
              v-model="roomGuest"
              class="fluid"
              placeholder="Room and Guest"
              size="large"
              icon="person-stalker"
              v-popover:guest>
            </el-input>
          </el-form-item>
        </el-col>
			</el-row>

			<el-row :gutter="20">

        <!-- pick date -->
        <el-col :span="8">
          <el-form-item label="Check-in" label-position="top">
            <el-date-picker
              v-model="checkin"
              type="date"
              size="large"
              class="fluid"
              placeholder="Pick a date to arrival">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Check-out" label-position="top">
            <el-date-picker
              v-model="checkout"
              type="date"
              size="large"
              class="fluid"
              placeholder="Pick a date depart">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- class seat -->
        <el-col :span="8">
          <el-form-item label="Star" label-position="top">
            <el-row class="fluid">
              <el-col :span="12" class="text-left">
              		<div class="hotel-star">
  									<el-rate
  										v-model="star"
  										:colors="['#58B7FF', '#20A0FF', '#1D8CE0']"
  										></el-rate>
  								</div>
              </el-col>
              <el-col :span="12" class="text-right">
                <el-button type="primary" icon="search" size="large">Search</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'hotel',
    data() {
      return {
      	hotel: [],
      	destination: '',
      	checkin: '',
      	checkout: '',
      	room: 1,
      	guest: {
      		adult: 1,
      		child: 0
      	},
      	star: 0,
        links: [],
        places: [
          { "value": "vue", "link": "https://github.com/vuejs/vue" },
          { "value": "element", "link": "https://github.com/ElemeFE/element" },
          { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
          { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
          { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
          { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
          { "value": "babel", "link": "https://github.com/babel/babel" },
         ]
      };
    },
    computed: {
      roomGuest: function () {
        let gs = this.guest
        let total = this.room + ' Room'
        if ( gs.adult > 0 ) { total += ', ' + gs.adult + ' Adult' }
        if ( gs.child > 0 ) { total += ', ' + gs.child + ' Children' }
        return total
      }
    },
    methods: {
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.places
      },
      handleSelect(item) {
        console.log(item);
      },
      handleChange(value) {
        console.log(value)
      },
    },
    mounted() {
      this.links = this.loadAll();
    }
  }
</script>

<style>
	.hotel-star {
		padding-top: 8px;
		padding-bottom: 25px
	}
	.hotel-star .el-rate__icon {
		font-size: 24px !important
	}
</style>