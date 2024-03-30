<template>
    <div class="input-container">
        <label class="input-label">{{ name }}</label> <!-- Utilizamos label en lugar de span -->
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
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-label,
input.InputGeneral {
    width: 100%;
}
.input-label {
    color: black;
    font-weight: bold;
    margin-bottom: 6px;
}

input.InputGeneral {
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
