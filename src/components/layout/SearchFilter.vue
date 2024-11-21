<template>
    <div class="w-full md:w-1/4 overflow-y-scroll p-4 bg-white">
        <h6 class="mb-4"><strong>Property Type</strong></h6>
        <div
            class="grid grid-cols-1 grid-cols-1 sm:sm:grid-cols-1 md:grid-cols-2 gap-2 mb-4"
        >
            <BaseButton
                :type="
                    checkSelectedPropertyType(pt.Id) ? 'primary' : 'secondary'
                "
                @click="selectPropertyType(pt.Id)"
                class="rounded"
                v-for="pt in propertyTypeList"
                :key="pt.Id"
                ><label class="text-sm">{{ pt.Name }}</label></BaseButton
            >
        </div>
        <div class="flex-col">
            <BaseInput
                type="radio"
                label="Sort Result by"
                :options="[
                    { value: 1, label: 'Newest Listing' },
                    { value: 2, label: 'Lowest Price' },
                    { value: 3, label: 'Highest Price' },
                ]"
            />
        </div>
        <h6 class="mb-4"><strong>Price Range</strong></h6>
        <BaseSlider
            :min="min"
            :max="max"
            v-model:minValue="minVal"
            v-model:maxValue="maxVal"
        />
        <h6><strong>Building Facility</strong></h6>
        <BaseInput type="checkbox" label="All" />
        <div class="h-px bg-slate-300 w-full my-4"></div>
        <div class="flex">
            <BaseButton
                class="flex mr-1 rounded items-center text-center w-full"
                type="secondary"
                @click="toggleFilterPopUp"
            >
                <label>Clear All</label>
            </BaseButton>
            <BaseButton
                class="rounded ml-1 flex items-center w-full"
                type="primary"
            >
                <label>Show ({{ countFilters() }})</label>
            </BaseButton>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        minValue: {
            type: Number,
        },
        maxValue: {
            type: Number,
        },
        propertyTypeList: {
            type: Object,
        },
        selectedPropertyType: {
            type: Object,
        },
    },
    data() {
        return {
            minVal: this.minValue,
            maxVal: this.maxValue,
        };
    },
    watch: {
        minVal() {
            this.$emit("update:minValue", this.minVal);
        },
        maxVal() {
            this.$emit("update:maxValue", this.maxVal);
        },
    },
    created() {},
    methods: {
        countFilters() {
            return 0;
        },
        checkSelectedPropertyType(Id) {
            return this.selectedPropertyType.includes(Id);
        },
        selectPropertyType(Id) {
            this.$emit("selectPropertyType", Id);
        },
    },
};
</script>

<style></style>
