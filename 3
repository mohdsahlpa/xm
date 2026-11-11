#include <stdio.h>
#include <stdlib.h>

/**
 * Program 3: Singly Linked List Implementation
 * Description: Implements node creation, insertion at head/tail, and traversal.
 */

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int value) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    if (!newNode) {
        perror("Memory allocation failed");
        exit(EXIT_FAILURE);
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void insertAtEnd(struct Node **head, int value) {
    struct Node *newNode = createNode(value);
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    struct Node *temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
}

void displayList(struct Node *head) {
    printf("List elements: ");
    struct Node *temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

void freeList(struct Node *head) {
    struct Node *temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

int main(void) {
    struct Node *head = NULL;

    printf("=== Singly Linked List Operations ===\n\n");
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    insertAtEnd(&head, 40);

    displayList(head);

    freeList(head);
    return 0;
}
