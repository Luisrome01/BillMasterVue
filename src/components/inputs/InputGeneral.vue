<template>
    <div class="input-container">
        <div class="containerName">
            <span>{{ name }}</span>
        </div>
        <input :type="type" :placeholder="placeholder" :style="inputStyle" :value="value" @input="handleInput"
            class="InputGeneral" />
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        value: [String, Number],
        onChange: Function,
        color: String,
        borderRadius: String,
        shadow: String,
        name: String,
        width: String,
    },
    methods: {
        handleInput(event) {
            this.onChange(event.target.value);
            this.$emit('change', event.target.value);
        }
    },
    computed: {
        inputStyle() {
            return {
                backgroundColor: this.color,
                borderRadius: this.borderRadius,
                boxShadow: this.shadow,
            };
        },
    },
};
</script>

<style scoped>
.input-container {
    width: 77.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.containerName {
    width: 100%;
}

.containerName span {
    color: black;
    font-weight: bold;
    margin-bottom: 6px;
    margin-left: -7px;
}

input.InputGeneral {
    width: 100%;
    color: black;
    font-weight: bold;
    border: none;
    outline: none;
    padding-left: 10px;
    height: 50px;
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.25);
    border-radius: 10px;
}

.input-label:focus,
.InputGeneral:focus {
    transition: 0.25s;
    background: rgba(174, 187, 253, 0.75);
}
</style>

