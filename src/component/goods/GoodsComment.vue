<template>
    <div>
        <cmtbox :id="this.$route.params.id"></cmtbox>  
    </div>
</template>

<script>
import cmtbox from '../subcomponents/Comment.vue'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    components: {
        cmtbox
    }    
}
</script>

<style lang="scss" scoped>

</style>
