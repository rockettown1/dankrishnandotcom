// // *** this is a solution for the most common prefix NOT including all the strings

// // var longestCommonPrefix = function (strs) {
// //   if (strs[0] == "") return "";
// //   if (strs.length === 1) return strs[0][0];

// //   const loopAndCount = (arr, letterIndex) => {
// //     const preHash = {};
// //     for (let i = 0; i < arr.length; i++) {
// //       if (preHash[arr[i][letterIndex]]) {
// //         preHash[arr[i][letterIndex]]++;
// //       } else {
// //         preHash[arr[i][letterIndex]] = 1;
// //       }
// //     }

// //     return preHash;
// //   };

// //   let count = 0;
// //   let prefix = "";

// //   for (let i = 0; i < 6; i++) {
// //     if (count === 0) {
// //       const hash = loopAndCount(strs, i);
// //       count = Math.max(...Object.values(hash));
// //       prefix += Object.keys(hash).find((k) => hash[k] === count);
// //     } else if (Math.max(...Object.values(loopAndCount(strs, i))) !== count) {
// //       break;
// //     } else {
// //       const hash = loopAndCount(strs, i);
// //       count = Math.max(...Object.values(hash));
// //       prefix += Object.keys(hash).find((k) => hash[k] === count);
// //     }
// //   }

// //   if (count == 1) {
// //     return "";
// //   }
// //   return prefix;
// // };

// // var longestCommonPrefix = function (strs) {
// //   let count = 0;
// //   const firstWord = strs[0];
// //   const shortestWordLength = Math.min(...strs.map((el) => el.length));
// //   let temp = [];

// //   for (let i = 0; i < shortestWordLength; i++) {
// //     temp = strs.filter((word) => word[i] === firstWord[i]);

// //     if (temp.length !== strs.length) {
// //       break;
// //     } else {
// //       count++;
// //     }
// //   }
// //   return firstWord.slice(0, count);
// // };

// // console.log(longestCommonPrefix(["flower", "flow", "flight"]));

// // var isValid = function (s) {

// //   let stack = s.split("");
// //   if (stack[0] === "}" || stack[0] === "]" || stack[0] === ")") {
// //     return false;
// //   }

// //   for (let i = 0; i < stack.length; i++) {
// //     pairs[")"]();
// //   }
// //   console.log(pairs);
// // };

// // isValid("()[]{}");

// //if you hit a closing bracket. the order of closing brackets should mirror the opening brackets.

// class ListNode {
//   constructor(data) {
//     this.data = data;
//     this.next = null;
//   }
// }

// class LinkedList {
//   constructor(head = null) {
//     this.head = head;
//   }
// }

// let node1 = new ListNode(2);
// let node2 = new ListNode(5);
// node1.next = node2;

// const createLinkedList = (data) => {
//   let head = new ListNode(data[0]);
//   let prevNode = head;
//   let nextNode;
//   for (let i = 0; i < data.length - 1; i++) {
//     nextNode = new ListNode(data[i + 1]);
//     prevNode.next = nextNode;
//     prevNode = nextNode;
//   }
//   return head;
// };

// const list1 = new LinkedList(createLinkedList([1, 2, 4]));
// const list2 = new LinkedList(createLinkedList([1, 3, 4]));

// // Definition for singly-linked list.
// // function ListNode(val, next) {
// //   this.val = val === undefined ? 0 : val;
// //   this.next = next === undefined ? null : next;
// //   return this;
// // }
// /**

//  * @param {ListNode} list1
//  * @param {ListNode} list2
//  * @return {ListNode}
//  */
// var mergeTwoLists = function (list1, list2) {
//   //create a new empty linked list (has a val and next properties)
//   let list3 = new ListNode(null, null);
//   console.log(list3);
//   //store the new linkedlist in a prev variable
//   let prev = list3;

//   while (list1 != null && list2 != null) {
//     //if the number stored in the first node of list 1 is less than list 2 then store that node in the next prop on prev
//     if (list1.data <= list2.data) {
//       prev.next = list1;
//       //move list1 along one to the next node
//       list1 = list1.next;
//     } else {
//       prev.next = list2;
//       list2 = list2.next;
//     }

//     //move list stored in previous along to the next node
//     prev = prev.next;
//   }

//   //if either of the lists have ended, just append the rest of the other as we know they're already sorted
//   if (list1 === null) prev.next = list2;
//   if (list2 === null) prev.next = list1;

//   return list3.next;
// };

// let list3 = mergeTwoLists(list1.head, list2.head);

// const valuesArr = [];
// let head = list3;

// while (head != null) {
//   valuesArr.push(head.data);
//   head = head.next;
// }

// console.log(valuesArr);

// //tester can we do this without the empty data value on the head of the new linked list?

// const containsDups = (nums) => {
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i + 1] == nums[i]) {
//       return true;
//     }
//   }
//   return false;
// };

// const containsDups2 = (nums) => {
//   const hashMap = {};
//   for (let i = 0; i < nums.length; i++) {
//     if (hashMap[nums[i]] != undefined) {
//       return true;
//     }
//     hashMap[nums[i]] = i;
//   }

//   return false;
// };

// console.log(containsDups2([1, 2, 3]));

// const isValid = (s) => {
//   const stack = [];

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] == "]" && stack[stack.length - 1] == "[") {
//       stack.pop();
//       continue;
//     } else if (s[i] == "}" && stack[stack.length - 1] == "{") {
//       stack.pop();
//       continue;
//     } else if (s[i] == ")" && stack[stack.length - 1] == "(") {
//       stack.pop();
//       continue;
//     }
//     stack.push(s[i]);
//   }

//   return stack.length == 0;
// };

// console.log(isValid("(())"));
// // [{[()]}]
// //(){}[]
// //{[()[]]}

// const testArr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; //output 6 from max sub array which is [4,-1,2,1]
// const testArr2 = [5, 4, -1, 7, 8]; // output 23 subarray is starting array [5,4,-1,7,8]
// const testArr3 = [5, 4, -20, 7, 8]; // 15 from [7,8]

// const maxSubArray = (nums) => {
//   console.log("MaxSubArray");
//   let sum = 0;
//   let maxSum = -Infinity;
//   let largest = -Infinity;

//   for (let i = 0; i < nums.length; i++) {
//     sum = maxSum + nums[i];
//     if (nums[i] > sum) {
//       maxSum = nums[i];
//     } else {
//       maxSum = sum;
//     }
//     largest = Math.max(largest, maxSum);
//   }
//   return largest;
// };

// console.log(maxSubArray([8, 7, -20, 4, 5]));

// /*
// KADANE'S ALGORITHM
// taking the array [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// 1. local_max is either -Infinity or [-2] global max = -2

//                         sum        nums[i]                   maxSum
// 2. local_Max is either [-2, 1] or [1] ==> sum -1 or 1 ==> global_max 1
// 3. local_max is either [1, -3] or [-3] ===> sum -2 or -3 ==> global_max  -2
// 4. local_max is either [1, -3, 4] or [4] ===> sum 2 or 4 ==> global_max  4
// 5. local_max is either [4, -1] or [-1] ===> sum 3 or -1 ==>global_max  3
// 6. local_max is either [4, -1, 2] or [2] ===> sum 5 or 2 ==> global_max 5
// 7. local_max is either [4, -1, 2, 1] or [1] ===> sum 6 or 1 ==> global_max 6
// 8. local_max is either [4, -1, 2, 1, -5] or [-5] ===> sum 1 or -5 ==> global_max 1
// 9. local_max is either [4, -1, 2, 1, -5, 4] or [4] ===> 5 or 4 ==> global_max 5

// at each stage you're comparing the global max's
// */

// /*
// [3,-2,4]
// by brute force
// [3]         3
// [3, -2]     1
// [3, -2, 4]  5 <-- max

// [-2]        -2
// [-2, 2]     0

// [3]         3

// [5, 4, -20, 7, 8]

// [5]                 5
// [5 , 4]             9 <-- local max
// [5, 4, -20]         -11
// [5, 4, -20, 7]      -4
// [5, 4, -20, 7, 8]   4

// [4]                 4 <-- local max
// [4, -20 ]           -16
// [4, -20, 7]         -9
// [4, -20, 7, 8]      -1

// [ -20 ]             -20
// [ -20,7]            -13
// [ -20, 7, 8]        -5 <-- local max

// [ 7]                7
// [ 7, 8]             15 <--- global max

// [8]                 8 <-- local max

// Visualising it wrong? Look at it like this:

//  [5]               5 <-- local Max

//     [4]            4
//  [5, 4]            9 <-- local Max

//         [-20]      -20
//      [4, -20]      -16
//  [5, 4, -20]       -11 <-- local max

//             [7]    7   <-- local max
//        [-20, 7]    -13
//     [4, -20, 7]    -9
//  [5, 4, -20, 7]    -4

//                [8]  8
//             [7, 8]  15 <-- local max (and global max)
//        [-20, 7, 8]  -5
//     [4, -20, 7, 8]  -1
//  [5, 4, -20, 7, 8]  4

// Taking the local maxes and next element

// local max at index i, is the max between num[i] and the sum of num[i] + the local maximum before it (i-1)

// so at each index position you are asking the question:
// What's larger, the number at this position OR the number at this position plus the local max before it

// So, for [5, 4, -20, 7, 8]
// what's larger 5 or 0? 5
// what's larger 4 or 4+5? 4+5 = 9
// what's larger -20 or 9 + -20? 9+ -20 = -11
// what's larger 7 or 7 + -11? 7
// what's larger 8 or 7 + 8? 7+ 8 = 15 <-- global max

// what is array was reversed?
// So, for [8, 7, -20, 4, 5]
// what's larger 8 or 0? 8
// what's larger 7 or 7+8? 7+8 = 15
// what's larger -20 or -20+15? -20+15 = -5
// what's larger 4 or 4 + -5? 4
// what's larger 5 or 5 + 4? 5 + 4 = 9

// */

// const maxSub = (nums) => {
//   localMax = 0;
//   globalMax = -Infinity;

//   for (let i = 0; i < nums.length; i++) {
//     localMax = Math.max(nums[i], nums[i] + localMax);

//     if (localMax > globalMax) {
//       globalMax = localMax;
//     }
//   }
//   return globalMax;
// };

// console.log(maxSub([5, 4, -20, 7, 8]));

// // const mergeTwo = (nums1, nums2) => {
// //   const merged = [...nums1.filter((num) => num !== 0), ...nums2.filter((num) => num !== 0)];
// //   return merged.sort((a, b) => a - b);
// // };

// const mergeTwo = (nums1, m, nums2, n) => {
//   // nums1.splice(m, 0, ...nums2);
//   // nums1.splice(m + n, nums1.length - (m + n));
//   // nums1.sort((a, b) => a - b);
//   nums1.splice(m, nums1.length, ...nums2.slice(0, n));
//   console.log(nums1);
// };

// mergeTwo([1, 2, 3, 0, 0, 0, 0], 3, [-1, 0, 2, 5, 6], 5);

// [ -3, -2, 1, 0, 2]
// const sumZero = (arr) => {
//   const hashMap = {};
//   const pairs = [];
//   for (let num of arr) {
//     if (num == 0) continue;

//     if (!hashMap[num]) {
//       hashMap[0 - num] = num;
//     } else {
//       pairs.push([hashMap[num], num]);
//     }
//   }
//   return pairs;
// };

// console.log(sumZero([-3, -2, -1, 0, 1, 2, 3]));

// function countUniqueValues(arr) {
//   let i = 0;
//   let j = 1;

//   if (arr.length == 0) return 0;
//   if (arr.length == 1) return 1;

//   while (j < arr.length) {
//     if (arr[i] !== arr[j]) {
//       i++;
//       arr[i] = arr[j];
//     }
//     j++;
//   }
//   return i + 1;
// }

// console.log(countUniqueValues([6]));

// function sumRange(num) {
//   let total = 0;
//   for (let i = 1; i <= num; i++) {
//     total += i;
//   }
//   return total;
// }

// console.log(sumRange(10));

// function binarySearch(arr, val) {
//   //pointer indices
//   let left = 0;
//   let right = arr.length - 1;

//   while (left <= right) {
//     let middle = Math.round((left + right) / 2);
//     if (val == arr[middle]) return middle;

//     //update left or right pointer
//     if (val < arr[middle]) right = middle - 1;
//     else left = middle + 1;
//   }
//   return -1;
// }

// function binarySearch(arr, val, left, right) {
//   if (left <= right) {
//     let middle = Math.round((left + right) / 2);

//     if (val == arr[middle]) {
//       return middle;
//     }
//     if (val < arr[middle]) {
//       return binarySearch(arr, val, left, middle - 1);
//     } else {
//       return binarySearch(arr, val, middle + 1, right);
//     }
//   }
//   return -1;
// }

// console.log(binarySearch([1, 2, 3], 3, 0, -2));

//[1,2,3,4,5,6,7] , 8
// l   m       r

//[1,2,3,4,5,6,7] , 8
//       l m   r

//[1,2,3,4,5,6,7] , 8
//           l mr

//[1,2,3,4,5,6,7] , 8
//             lmr -> end

// const naiveStringSearch = (str, sub) => {
//   let matches = 0;
//   for (let i = 0; i < str.length; i++) {
//     for (let j = 0; j < sub.length; j++) {
//       if (str[i + j] !== sub[j]) break;
//       if (j == sub.length - 1) matches++;
//     }
//   }
//   console.log(matches);
// };

// // wowomgwzo
// //  omg

// naiveStringSearch("wowomgwzomg f asdf asdf asdf asdf omg asdf asdf omg", "omg");

// const bubbleSort = (arr) => {
//   for (let i = arr.length - 1; i > 0; i--) {
//     console.log("pass: ", arr.length - i);
//     let swaps = false;
//     for (let j = 0; j < i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         const temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//         swaps = true;
//       }
//     }
//     if (!swaps) break;
//   }
//   return arr;
// };

// console.log(bubbleSort([2, 6, 1, 7, 3]));

//
// [21, 2, 5, 13, 32, 1, 34]

// const myArray = [1, 2, 3, 4];

// [myArray[1], myArray[0]] = [myArray[0], myArray[1]];

// console.log(myArray);

/*
what are the base cases?
no more items to sort - items being looked at = 1
*/

// function bubbleSort(arr, length) {
//   if (length == 1) return arr;
//   console.log("running");
//   let swaps = false;

//   for (let j = 0; j < length - 1; j++) {
//     if (arr[j] > arr[j + 1]) {
//       const temp = arr[j];
//       arr[j] = arr[j + 1];
//       arr[j + 1] = temp;
//       swaps = true;
//     }
//   }

//   if (!swaps) return arr;

//   return bubbleSort(arr, length - 1);
// }

// console.log(bubbleSort([2, 6, 1, 7, 3], 5));

/*
func6 -> returns [1,  2,  5, 13, 21, 32, 34]
func5 -> returns the return value of func6 -> [1,  2,  5, 13, 21, 32, 34]
func4 -> returns the return value of func5 -> [1,  2,  5, 13, 21, 32, 34]
func3 -> returns the return value of func4 -> [1,  2,  5, 13, 21, 32, 34]
func2 -> returns the return value of func3 -> [1,  2,  5, 13, 21, 32, 34]
func1 -> returns the return value of func2 -> [1,  2,  5, 13, 21, 32, 34]

*/

// function selectionSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let min = i;
//     for (let j = i; j < arr.length - 1; j++) {
//       if (arr[j + 1] < arr[min]) {
//         min = j + 1;
//       }
//     }
//     if (i !== min) {
//       let temp = arr[i];
//       arr[i] = arr[min];
//       arr[min] = temp;
//     }
//   }
//   console.log(arr);
// }

// selectionSort([21, 2, 5, 13, 32, 1, 34]);

//not correct implemetation as you do not need to swap each time
// function insertionSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     for (let j = i - 1; j >= 0; j--) {
//       if (arr[j + 1] < arr[j]) {
//         const temp = arr[j + 1];
//         arr[j + 1] = arr[j];
//         arr[j] = temp;
//       } else {
//         break;
//       }
//     }
//   }
//   console.log(arr);
// }

// function insertionSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     let current = arr[i];
//     for (let j = i - 1; j >= 0; j--) {
//       if (current < arr[j]) {
//         arr[j + 1] = arr[j];
//       } else {
//         break;
//       }

//       if (current > arr[j - 1] || j == 0) {
//         arr[j] = current;
//       }
//     }
//   }
//   return arr;
// }

// function insertionSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     let current = arr[i];
//     let j = i - 1;
//     while (j >= 0 && current < arr[j]) {
//       arr[j + 1] = arr[j];
//       j--;
//     }
//     arr[j + 1] = current;
//   }
//   return arr;
// }

// console.log(insertionSort([21, 40, 2, 5, 13, 32, 7, 34]));

//merge two sorted arrays
// const merge = (arr1, arr2) => {
//   const result = [];
//   i = 0;
//   j = 0;

//   while (i < arr1.length && j < arr2.length) {
//     if (arr1[i] < arr2[j]) {
//       result.push(arr1[i]);
//       i++;
//     } else {
//       result.push(arr2[j]);
//       j++;
//     }
//   }

//   while (i < arr1.length) {
//     result.push(arr1[i]);
//     i++;
//   }

//   while (j < arr2[j]) {
//     result.push(arr2[j]);
//     j++;
//   }

//   return result;
// };

// merge([1, 2, 4, 6, 7], [11, 45, 55]);

// function mergeSort(arr) {
//   if (arr.length <= 1) return arr; //base case
//   let mid = Math.floor(arr.length / 2);
//   let left = mergeSort(arr.slice(0, mid));
//   let right = mergeSort(arr.slice(mid));
//   return merge(left, right);
// }

// console.log(mergeSort([2, 5, 11, 467, 57, 45, 89, 8, 12, 3, 1, 0, 143]));
// function pivot(arr, start, end) {
//   let pivot = arr[start];
//   let swapIndex = start;
//   for (let i = start + 1; i <= end; i++) {
//     if (arr[i] < pivot) {
//       swapIndex++;
//       const temp = arr[swapIndex];
//       arr[swapIndex] = arr[i];
//       arr[i] = temp;
//     }
//   }
//   const temp = arr[start];
//   arr[start] = arr[swapIndex];
//   arr[swapIndex] = temp;
//   return swapIndex;
// }

// function qSort(arr, left = 0, right = arr.length - 1) {
//   if (left < right) {
//     let pivotIndex = pivot(arr, left, right);
//     qSort(arr, left, pivotIndex - 1);
//     qSort(arr, pivotIndex + 1, right);
//   }

//   return arr;
// }

// console.log(qSort([2, 5, 11, 467, 57, 45, 89, 8, 12, 3, 1, 0, 143]));

// function partition(arr, left, right) {
//   let pivot = arr[Math.floor((right + left) / 2)];
//   console.log(pivot);
//   let i = left;
//   let j = right;

//   while (i <= j) {
//     while (arr[i] < pivot) {
//       i++;
//     }
//     while (arr[j] > pivot) {
//       j--;
//     }

//     if (i <= j) {
//       const temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;
//       i++;
//       j--;
//     }
//   }
//   return i;
// }

//            p
// [2, 7, 3, 1, 6, 9, 15, 14]
//              ij

// function altQuickSort(arr, left, right) {
//   if (arr.length > 1) {
//     let i = partition(arr, left, right);
//     if (left < i - 1) {
//       altQuickSort(arr, left, i - 1);
//     }
//     if (i < right) {
//       altQuickSort(arr, i, right);
//     }
//   }
//   return arr;
// }

// const arr1 = [2, 15, 3, 9, 6, 1, 7, 14];
// console.log("alt", altQuickSort(arr1, 0, arr1.length - 1));

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

//there are two main ways of doing this
//1. Could convert to a string and get the length
//2. Could use log10, floor it and add 1
function digitCount(num) {
  //note regex is needed here to only look at numbers (ie ignore minus sign)
  return num.toString().match(/\d/g).length;
}

//the number of iterations of Radix sort depends on the longest number
function mostDigits(arr) {
  let longest = 0;
  for (let i = 0; i < arr.length; i++) {
    longest = Math.max(longest, digitCount(arr[i]));
  }

  return longest;
}

const testCase = [1, 43, 1534, 2, 3456, 2344, 77, 42312]; // 5
console.log(mostDigits(testCase));
