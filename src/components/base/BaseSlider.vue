<template>
    <div class="range_container pt-4">
        <div class="sliders_control">
            <input
                id="fromSlider"
                ref="fromSlider"
                type="range"
                :value="minValue"
                :min="min"
                :max="max"
                @input="updateMinValue"
            />
            <input
                id="toSlider"
                ref="toSlider"
                type="range"
                :value="maxValue"
                :min="min"
                :max="max"
                @input="updateMaxValue"
            />
        </div>
        <div class="form_control">
            <div class="w-full text-gray-600">
                <input
                    class="w-full p-3 border border-gray-300 rounded-md"
                    id="fromInput"
                    ref="fromInput"
                    :value="minValue"
                    @blur="updateMinValue"
                />
            </div>
            <label class="mx-2">-</label>
            <div class="w-full text-gray-600">
                <input
                    class="w-full p-3 border border-gray-300 rounded-md"
                    id="toInput"
                    ref="toInput"
                    :value="maxValue"
                    @blur="updateMaxValue"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        minValue: {
            type: Number,
            default: 20,
        },
        maxValue: {
            type: Number,
            default: 80,
        },
    },
    mounted() {
        const fromSlider = this.$refs.fromSlider;
        const toSlider = this.$refs.toSlider;
        const fromInput = this.$refs.fromInput;
        const toInput = this.$refs.toInput;

        const getParsed = (currentFrom, currentTo) => [
            parseInt(currentFrom.value, 10),
            parseInt(currentTo.value, 10),
        ];

        const controlFromInput = () => {
            const [from, to] = getParsed(fromInput, toInput);
            if (from > to) {
                fromInput.value = to;
            }
            this.fillSlider(fromSlider, toSlider);
        };

        const controlToInput = () => {
            const [from, to] = getParsed(fromInput, toInput);
            if (from <= to) {
                toSlider.value = to;
            }
            this.fillSlider(fromSlider, toSlider);
        };

        const controlFromSlider = () => {
            const [from, to] = getParsed(fromSlider, toSlider);
            if (from > to) {
                fromSlider.value = to;
            }
            fromInput.value = from;
            this.fillSlider(fromSlider, toSlider);
        };

        const controlToSlider = () => {
            const [from, to] = getParsed(fromSlider, toSlider);
            if (from <= to) {
                toInput.value = to;
            } else {
                toSlider.value = from;
            }
            this.fillSlider(fromSlider, toSlider);
        };
        this.fillSlider(fromSlider, toSlider);

        fromSlider.oninput = controlFromSlider;
        toSlider.oninput = controlToSlider;
        fromInput.oninput = controlFromInput;
        toInput.oninput = controlToInput;
    },
    methods: {
        updateMinValue(event) {
            const value = Number(event.target.value);
            if (value <= this.maxValue) {
                this.$emit("update:minValue", value);
            } else {
                this.$refs.fromSlider.value = this.maxValue;
                this.fillSlider(this.$refs.fromSlider, this.$refs.toSlider);
                this.$emit("update:minValue", this.maxValue);
            }
        },
        updateMaxValue(event) {
            const value = Number(event.target.value);
            if (value >= this.minValue) {
                this.$emit("update:maxValue", value);
            } else {
                this.$refs.toSlider.value = this.minValue;
                this.fillSlider(this.$refs.fromSlider, this.$refs.toSlider);
                this.$emit("update:maxValue", this.minValue);
            }
        },
        fillSlider(from, to) {
            const toSlider = this.$refs.toSlider;
            const rangeDistance = toSlider.max - toSlider.min;
            const fromPosition = from.value - toSlider.min;
            const toPosition = to.value - toSlider.min;
            toSlider.style.background = `linear-gradient(
                to right,
                #C6C6C6 0%,
                #C6C6C6 ${(fromPosition / rangeDistance) * 100}%,
                #1256FD ${(fromPosition / rangeDistance) * 100}%,
                #1256FD ${(toPosition / rangeDistance) * 100}%,
                #C6C6C6 ${(toPosition / rangeDistance) * 100}%,
                #C6C6C6 100%)`;
        },
    },
};
</script>

<style scoped>
.range_container {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.sliders_control {
    position: relative;
    min-height: 36px;
}

.form_control {
    position: relative;
    display: flex;
    justify-content: space-between;
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #c6c6c6;
    cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    pointer-events: all;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #c6c6c6;
    cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover {
    background: #f7f7f7;
}

input[type="range"]::-webkit-slider-thumb:active {
    box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
    -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type="number"] {
    color: #8a8383;
    width: 50px;
    height: 30px;
    font-size: 20px;
    border: none;
}

input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 2px;
    width: 100%;
    position: absolute;
    background-color: #c6c6c6;
    pointer-events: none;
}

#fromSlider {
    height: 0;
    z-index: 1;
}
</style>
