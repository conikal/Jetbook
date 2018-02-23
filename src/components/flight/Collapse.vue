<style>
.collapse {
}
.collapse .collapse-header a {
  color: #475669;
}
.collapse .collapse-header > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collapse .collapse-content-box {
  -moz-transition: all .2s;
  -o-transition: all .2s;
  -webkit-transition: all .2s;
  transition: all .2s;
}
</style>

<template>
  <div class="collapse collapse-item" :class="{ 'is-active': active }">
    <div class="collapse-header touchable" role="tab" :aria-expanded="active ? 'true' : 'fase'" @click.prevent="toggle">
      <slot name="collapse-header"></slot>
    </div>
    <transition name="fade">
      <div class="collapse-content" v-if="active">
        <div class="collapse-content-box">
          <slot name="collapse-body"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Collapse",
  data(){
    return {
      active: false
    }
  },
  props: {
    selected: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  created () {
    this._isCollapseItem = true
    this.active = this.selected
  },
  ready () {
    if (this.active) {
      this.$emit('collapse-open', this.index)
    }
  },
  methods: {
    toggle () {
      this.active = !this.active
      if (this.active) {
        this.$emit('collapse-open', this.index)
      }
    }
  }
}
</script>