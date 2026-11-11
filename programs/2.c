#include <stdio.h>

/**
 * Program 2: Bubble Sort Algorithm
 * Description: Sorts an array of integers in ascending order.
 */

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

void printArray(const char *label, int arr[], int n) {
    printf("%s: [", label);
    for (int i = 0; i < n; i++) {
        printf("%d%s", arr[i], (i == n - 1) ? "" : ", ");
    }
    printf("]\n");
}

int main(void) {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90, 88, 45, 2};
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("=== Bubble Sort in C ===\n\n");
    printArray("Initial array", numbers, n);

    bubbleSort(numbers, n);

    printArray("Sorted array ", numbers, n);
    return 0;
}
