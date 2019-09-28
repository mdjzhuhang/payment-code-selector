<template>
	<div class="wrap">
		<h1>Payment Code Selector</h1>
		<select v-model.number="categoryIndex">
			<option value=0>Choose a category</option>
			<option v-for="(item, index) in categoryList" :value="index + 1" v-html="item.category"></option>
		</select>
		<select v-model.number="codePart1Index" v-if="categoryIndex > 0">
			<option value=0>Choose a description</option>
			<option v-for="(item, index) in codeList1" :value="index + 1" v-html="item.description"></option>
		</select>
		<select v-model.number="codePart2Index" v-if="codePart1Index > 0 && codeList2">
			<option value=0>Choose a description</option>
			<option v-for="(item, index) in codeList2" :value="index + 1" v-html="item.description"></option>
		</select>
		<select v-model.number="codePart3Index" v-if="codePart2Index > 0 && codeList3">
			<option value=0>Choose a description</option>
			<option v-for="(item, index) in codeList3" :value="index + 1" v-html="item.description"></option>
		</select>
		<p>
			Payment code is: {{finalCode}}
		</p>
	</div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from '../assets/axios';

@Component
export default class CodeSelector extends Vue {

  // Data property
  public categoryIndex: number = 0;
  public categoryList: any = [];
  public codePart1Index: number = 0;
  public codePart2Index: number = 0;
  public codePart3Index: number = 0;

  @Watch('categoryIndex')
  public changeCategoryIndex() {
    this.codePart1Index = 0;
    this.codePart2Index = 0;
    this.codePart3Index = 0;
  }

  @Watch('codePart1Index')
  public changecodePart1() {
    this.codePart2Index = 0;
    this.codePart3Index = 0;
  }

  @Watch('codePart2Index')
  public changecodePart2() {
    this.codePart3Index = 0;
  }

  // computed
  get codeList1() {
    if (!this.categoryIndex) {
      return [];
    }
    return this.categoryList[this.categoryIndex - 1].list;
  }

  get codeList2() {
    if (!this.codePart1Index) {
      return [];
    }
    return this.codeList1[this.codePart1Index - 1].sub;
  }

  get codeList3() {
    if (!this.codePart2Index) {
      return [];
    }
    return this.codeList2[this.codePart2Index - 1].sub;
  }

  get finalCode() {
    if (!this.categoryIndex || !this.codePart1Index) {
      return '';
    }

    let str = this.codeList1[this.codePart1Index - 1].code;

    if (this.codePart2Index) {
      str = str + '-' + this.codeList2[this.codePart2Index - 1].code;
    }

    if (this.codePart3Index) {
      str = str + '-' + this.codeList3[this.codePart3Index - 1].code;
    }

    return str;
  }

  // Lifecycle hook
  public mounted() {
    this.getCodeData();
  }

  // Component method
  public getCodeData() {
    axios({
      method: 'get',
      url: '/get/codeData',
      callback: (res: any) => {
        this.categoryList = res.data || [];
      },
    });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
	font-size: 1.5rem;
}

.wrap {
	width: 90%;
	margin: 0 auto;
	text-align: left;
}

select {
	width: 90%;
	margin: 20px 0;
	height: 2rem;
	white-space: pre-line;
	border: 1px solid #999;
}
</style>