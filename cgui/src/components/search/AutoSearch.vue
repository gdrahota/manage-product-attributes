<template>
    <div class="">
        <div class="bg-white" style="width: 800px">
            <q-select
                :input-style="{paddingLeft: '20px'}"
                color="white"
                placeholder="I am looking for ..."
                use-input
                :loading="isLoading"
                @filter="filterFxn"
                option-value="id"
                :options="options"
                :value="model"
                hide-dropdown-icon
                input-debounce="0"
            >
                <template v-slot:append>
                    <q-icon class="q-mr-sm" name="mdi-magnify" />
                </template>
                <template v-slot:no-option>
                    <q-item v-close-popup class="text-grey">
                        <q-item-section>Find PVC Panels, Solar Panels, etc...</q-item-section>
                    </q-item>
                </template>
                <template v-slot:option="scope">
                    <q-item clickable>
                        <q-item-section avatar>
                            <q-avatar size="30px" font-size="52px" text-color="white">
                                <img
                                    src="../../assets/solar_back_2.jpg"
                                    spinner-color="primary"
                                    spinner-size="82px"
                                />
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            {{scope.opt.name}}
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            isLoading: false,
            items: [
                'Solar Panel',
                'PVC',
                'Inverter',
                'Solar Battery',
                'Mounter',
                'Connector'
            ],
            options: [],
            model: [],
            search: null,
            tab: null,
        }),

        computed:{
            ...mapGetters({
                products: 'products/getAll'
            })
        },


        methods:{

            filterFxn(val, update){
                if(val === ""){
                    update(() => {
                        this.options = []
                    })
                    return
                }
                this.isLoading = true
                update(() => {
                    const inputed = val.toLowerCase()
                    this.options = this.products.filter((item) => (item.name.toLowerCase()).includes(inputed))
                })
            },

            setModel(val){
                this.model = val
            },

            selected(){
                // alert("pooped");
            },
        },

        mounted(){
           
        }
    }
</script>

<style scoped>

</style>
