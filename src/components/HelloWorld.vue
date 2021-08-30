<template>
  <div id="app">
  <v-app id="inspire">
    <!-- 使用vuetify的datatable组件 -->

    <!-- 搜索框绑定数据search，并自定义搜索过滤（可以省略）
    表头绑定数据headers，
    表项（表中数据）绑定数据prizes，根据prize_name排序
    设置一页显示的行数 -->
    <v-data-table
      :search="search"
      :custom-filter="filter"
      :headers="headers"
      :items="prizes"
      sort-by="prize_name"
      :items-per-page="10"
      class="elevation-1"
    >
    <!-- 设置datatable的顶部（表头上方部分） -->

    <!-- 搜索框，绑定数据search，
    添加按钮。 -->
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-spacer>
            <v-text-field
              v-model="search"
              label="Search"
              append-icon="mdi-magnify"
              hide-details
            />
          </v-spacer>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                添加
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.prize_name"
                        label="奖品金额 （元）"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.prize_amount"
                        label="奖品数量 （个）"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.prize_rate"
                        label="中奖率 （%）"
                        ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  取消
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">确定删除此项？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-app>
</div>
</template>

<script>
import{
  getPrize,
  deletePrize,
  updatePrize,
  insertPrize,
} from "@/api/prize-api"
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
        { text: "奖品金额 （元）", value: "prize_name" },
        { text: "奖品数量 （个）", value: "prize_amount" },
        { text: "中奖率 （%）", value: "prize_rate" },
        { text: "操作", sortable: false, value: "actions"},
      ],
    prizes:[],
    editedIndex: -1,
    editedItem: {
      _id: '',
      createdAt: 0,
      updatedAt: 0,
      prize_name: 0,
      prize_amount: 0,
      prize_rate: 0,
    },
    defaultItem: {
      _id: '',
      createdAt: 0,
      updatedAt: 0,
      prize_name: 0,
      prize_amount: 0,
      prize_rate: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    // 搜索过滤器：
    // 使用正则表达式（i参数：不区分大小写）匹配
    filter(value, search, item) {
      let inName = RegExp(search, "i").prizes(item.prize_name);
      let inAmount = RegExp(search, "i").prizes(item.prize_amount);
      let inRate = RegExp(search, "i").prizes(item.prize_rate);
      return inName || inAmount || inRate;
    },
    getPrizeFunction() {
      console.log("getPrizeFunction");
      getPrize().then((response) => {
        this.prizes = response.response;
        console.log(this.prizes);
      });
    },
    initialize () {
      this.getPrizeFunction();
      // console.log(this.prizes);
    },

    editItem (item) {
      console.log("editItem");
      this.editedIndex = this.prizes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      console.log("deleteItem");
      this.editedIndex = this.prizes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // console.log(this.editedItem._id);
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      console.log("deleteItemConfirm");
      deletePrize(this.editedItem._id);
      // console.log(JSON.stringify(this.editItem));
      this.prizes.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      console.log("close");
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      console.log("closeDelete");
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      console.log("save");
      // updatePrize(this.editedItem._id,this.editedItem.prize_name,this.editedItem.prize_amount,this.editedItem.prize_rate);
      if (this.editedIndex > -1) {
        updatePrize(this.editedItem._id,this.editedItem.prize_name,this.editedItem.prize_amount,this.editedItem.prize_rate);
        Object.assign(this.prizes[this.editedIndex], this.editedItem)
      } else {
        insertPrize(this.editedItem.prize_name,this.editedItem.prize_amount,this.editedItem.prize_rate);
        this.prizes.push(this.editedItem);
      }
      this.close()
    },
  },
}
</script>

<style>

</style>