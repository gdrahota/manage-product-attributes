<template>
    <div class="">
        <div style="width: 800px">
            <q-select
                :input-style="{paddingLeft: '20px'}"
                color="white"
                placeholder="I am looking for ..."
                use-input
                :loading="isLoading"
                @filter="filterFxn"
                
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
                <template v-slot:option="{opt}">
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
                            {{opt}}
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>

<script>
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

        props: {
            type: String
        },

        watch: {
            something (val) {
              let selectProduct = this.items.filter(e=>{
                  return e.id === val;
              })
                console.log({selected:selectProduct});
              this.$store.commit('setFoundProduct', selectProduct[0]);
                this.$router.push(`/search_landing/${val}`);
            },
            select(val){

            },
            search (val){
                // Items have already been loaded
                if (this.items.length > 0) return
                this.isLoading = true;
                // Lazily load input items
                this.$store.dispatch("searchProducts",val)
                    // .then(res => res.json())
                    .then(res => {
                        this.items = res.data.products;
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            },
        },
        methods:{
            searchForm(){
                this.$router.push({name: 'products-search', params: {search: this.search}})
            },

            filterFxn(val, update){
                if(val === ""){
                    update(() => {
                        this.options = []
                    })
                    return
                }
                update(() => {
                    const inputed = val.toLowerCase()
                    this.options = this.items.filter((item) => item.toLowerCase().includes(inputed))
                })
            },

            setModel(val){
                this.model = val
            },

            selected(){
                // alert("pooped");
            },
        }
    }
</script>

<style scoped>

</style>
