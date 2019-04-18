import React from 'react';
import { createStore, combineReducers } from 'redux';

class Redux extends React.Component {
    
    componentDidMount(){
        console.clear()

        // People dropping off a form (Action Creators)
        const createPolicy = (name, amount) => {
            return { // Action (a form in our analogy, and this case insuranse department)
                type: "CREATE_POLICY",
                data: {
                    name: name,
                    amount: amount
                }
            };
        };

        const deletePolicy = (name) => { 
            return {
                type: "DELETE_POLICY",
                data: {
                    name: name
                }
            };
        };

        const createClaim = (name, amountOfMoneyToCollect) => {
            return {
                type: "CREATE_CLAIM",
                data: {
                    name: name,
                    amountOfMoneyToCollect: amountOfMoneyToCollect
                }
            };
        };

        // Reducers (Departments!)
        const claimHistory = (oldListOfClaims = [], action) => { // = [] maksudnya adalah jika seseorang pernah memanggil claimHistory dengan nilai undefined untuk oldListOfClaims maka nilai undafined nantinya akan diganti dengan array kosong 
            if (action.type === "CREATE_CLAIM") {
                // we care about this action as new data (FORM!)

                // oldListOfClaims.push(action.data) // menambahkan data dengan push untuk memodifikasi array yang ada

                /* ...oldListOfClaims berarti kita akan mengambil semua datanya disana dan menambakannya ke array baru, 
                dan kemudian kita akan menambahkan data baru (action.data) */
                return [...oldListOfClaims, action.data];
            } 
            // we don't care the action (FORM!)
            else {
                return oldListOfClaims;
            }
        }

        // reducer akuntasi akan membuat function yang akan dipanggil dengan semua total uang saat ini.
        const accounting = (totalMoney = 10000, action) => { // default value dari totalMoney 10000,
            if (action.type === "CREATE_CLAIM") { // dan jika seseorang mengklaim dan mengambil uang dari perusahaan, maka 10000 akan dikurangi dangan jumlah uang yang mereka ambil/kumpulkan.
                return totalMoney - action.data.amountOfMoneyToCollect
            }
            else if (action.type === "CREATE_POLICY") { // jika sesorang mendaftar yang artinya menambahkan uang atau membayar kepada perusahaan, maka totalMoney akan ditambahkan dengan jumlah uang yan dibayar kepada perusahaan.
                return totalMoney + action.data.amount
            }
            else { // maka selain dari kondisi diatas, maka akan mengreturn totalMoney.
                return totalMoney;
            }
        }

        const policies = (listOfPolicies = [], action) => { // daftar semua data yang ada dengan default value [] jika data tersebut undefined atau baru saja digunakan, dan action sebagai form.
            if (action.type === "CREATE_POLICY") { // jika sedang ada yang mendaftar atau ada yang menambahkan data baru,
                
                /* ...listOfPolicies berarti kita akan mengambil semua datanya disana dan menambakannya ke array baru, 
                dan kemudian kita akan menambahkan data baru (action.data.name), disini kita hanya perlu menambahkan atau memasukkan nama dari pendaftar baru, yang diambil dari properti dari name */
                return [...listOfPolicies, action.data.name] 
            }
            else if (action.type === "DELETE_POLICY") { // jika seseorang berhenti berlangganan, maka kita akan menghapus datanya dengan meggunakan filter
                return listOfPolicies.filter(name => name !== action.data.name); // artinya disini kita mengfilter semua list data yang ada beradasarkan name kemudian mencari data yang ingin dihapus berdasar name yang orang yang melakukan berhenti langganan.
            }
            else { // maka selain dari kondisi diatas, maka akan mengreturn semua list data yang ada.
                return listOfPolicies;
            }
        }

        /* kesimpulan dari case diatas, reducer adalah untuk mengambil beberapa data yang ada dari action user/pelanggan dan kemudian memodifikasi,
        dan mengreturn/mengembalikan data yang ada berdasarkan action dari user/pelanggan. */

        // mengambil redux-library, note: pastikan redux telah terinstall di projeknya.
        const ourDepartments = combineReducers({ // untuk menyatukan semua fungsi reducer, menggunakan combineReducer
            accounting: accounting,
            claimHistory: claimHistory,
            policies: policies
        })

        const store = createStore(ourDepartments);

        // const action = createPolicy("Reza", 20000)
        // console.log(action)

        // fungsi dispatch untuk melakukan pengiriman data ke store redux 
        // name, amount(user yg mendaftar sebagai klien) di funtion createPolicy
        store.dispatch(createPolicy("Khana", 20000))
        store.dispatch(createPolicy("Reza", 30000))
        store.dispatch(createPolicy("Maulana", 10000))

        // name, amount(user yg mengklaim atau menarik uang asuransinya) di funtion createClaim
        store.dispatch(createClaim("Khana", 40000))
        store.dispatch(createClaim("Maulana", 20000))

        // name(user yg berhenti sebagai klien) mungkin merasa gak butuh asuransinya, karna dia bekum pernah mengklaim sama sekali, di funtion delete
        store.dispatch(deletePolicy("Reza"))

        // untuk melihat hasilnya di console
        console.log(store.getState())
    }

    render(){
        return(
            <div>
            
            </div>
        )
    }
}
export default Redux;