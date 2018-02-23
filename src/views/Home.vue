<template>
  <div>
    <div class="container">
      <div class="home-title">
        <h1>Flights, no more, no less.</h1>
      </div>
      <flight></flight>
    </div>
  </div>
</template>

<script>
  import Flight from '../components/search/Flight.vue'
  import Hotel from '../components/search/Hotel.vue'

  export default {
    components: {
      Flight,
      Hotel
    },
    data() {
      return {
        activeName: 'flight'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style>
  .fluid {
    display: flex;
    width: 100% !important
  }

  .home-title {
    padding-top: 12%;
  }
  .home-title h1 {
    font-size: 52px;
    font-weight: 300;
  }
  .bg-faded {
    background-color: #f7f7f7;
  }
  .bg-primary {
    background-color: #20A0FF !important;
  }

  a.bg-primary:focus, a.bg-primary:hover {
    background-color: #025aa5 !important;
  }

  .bg-success {
    background-color: #13CE66 !important;
  }

  a.bg-success:focus, a.bg-success:hover {
    background-color: #449d44 !important;
  }

  .bg-info {
    background-color: #20A0FF !important;
  }

  a.bg-info:focus, a.bg-info:hover {
    background-color: #31b0d5 !important;
  }

  .bg-warning {
    background-color: #F7BA2A !important;
  }

  a.bg-warning:focus, a.bg-warning:hover {
    background-color: #ec971f !important;
  }

  .bg-danger {
    background-color: #FF4949 !important;
  }

  a.bg-danger:focus, a.bg-danger:hover {
    background-color: #c9302c !important;
  }

  .bg-inverse {
    background-color: #1F2D3D !important;
  }

  a.bg-inverse:focus, a.bg-inverse:hover {
    background-color: #101112 !important;
  }

  .text-white {
    color: #fff !important;
  }

  .text-muted {
    color: #636c72 !important;
  }

  a.text-muted:focus, a.text-muted:hover {
    color: #4b5257 !important;
  }

  .text-primary {
    color: #0275d8 !important;
  }

  a.text-primary:focus, a.text-primary:hover {
    color: #025aa5 !important;
  }

  .text-success {
    color: #5cb85c !important;
  }

  a.text-success:focus, a.text-success:hover {
    color: #449d44 !important;
  }

  .text-info {
    color: #5bc0de !important;
  }

  a.text-info:focus, a.text-info:hover {
    color: #31b0d5 !important;
  }

  .text-warning {
    color: #f0ad4e !important;
  }

  a.text-warning:focus, a.text-warning:hover {
    color: #ec971f !important;
  }

  .text-danger {
    color: #d9534f !important;
  }

  a.text-danger:focus, a.text-danger:hover {
    color: #c9302c !important;
  }

  .text-gray-dark {
    color: #292b2c !important;
  }

  a.text-gray-dark:focus, a.text-gray-dark:hover {
    color: #101112 !important;
  }

  .text-hide {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  .text-justify {
    text-align: justify !important;
  }

  .text-nowrap {
    white-space: nowrap !important;
  }

  .text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-left {
    text-align: left !important;
  }

  .text-right {
    text-align: right !important;
  }

  .text-center {
    text-align: center !important;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

.container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
}

@media (min-width: 576px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 768px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 992px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 1200px) {
  .container {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 576px) {
  .container {
    width: 540px;
    max-width: 100%;
  }
}

@media (min-width: 768px) {
  .container {
    width: 720px;
    max-width: 100%;
  }
}

@media (min-width: 992px) {
  .container {
    width: 960px;
    max-width: 100%;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1140px;
    max-width: 100%;
  }
}

.container-fluid {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
}

@media (min-width: 576px) {
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 768px) {
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 992px) {
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
  }
}

@media (min-width: 1200px) {
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
