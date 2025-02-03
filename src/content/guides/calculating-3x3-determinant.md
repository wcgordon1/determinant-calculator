---
title: How to Calculate a 3x3 Matrix Determinant
description: Master the Sarrus' rule and cofactor expansion methods for calculating 3x3 matrix determinants with clear examples.
date: 2024-03-18
tags: ["determinants", "3x3-matrix", "sarrus-rule", "cofactor-expansion"]
equation: "det([[a,b,c],[d,e,f],[g,h,i]]) = a(ei-fh) - b(di-fg) + c(dh-eg)"
steps: [
  {
    name: "Choose Method",
    text: "Decide between Sarrus' rule or cofactor expansion method"
  },
  {
    name: "Calculate First Term",
    text: "For cofactor expansion: Calculate a(ei-fh)"
  },
  {
    name: "Calculate Second Term",
    text: "Calculate -b(di-fg)"
  },
  {
    name: "Calculate Third Term",
    text: "Calculate c(dh-eg)"
  },
  {
    name: "Sum Results",
    text: "Add all terms together for the final determinant"
  }
]
---

# Calculating a 3x3 Matrix Determinant

This guide covers two methods for calculating the determinant of a 3x3 matrix: Sarrus' rule and cofactor expansion.

## The Matrix Structure

For a 3x3 matrix:
```
|a b c|
|d e f|
|g h i|
```

## Method 1: Sarrus' Rule

### Steps:

1. Write the first two rows again below the matrix
2. Multiply along the diagonals:
   - Main diagonals (positive terms)
   - Secondary diagonals (negative terms)
3. Add all terms together

### Visual Representation:
```
|a b c|
|d e f| → aei + bfg + cdh - ceg - bdi - afh
|g h i|
|a b c|
|d e f|
```

## Method 2: Cofactor Expansion

### The Formula
det = a(ei-fh) - b(di-fg) + c(dh-eg)

### Steps:

1. Choose first row for expansion
2. Calculate minors for each element
3. Apply alternating signs
4. Multiply and sum

## Example Calculation

Let's calculate the determinant of:
```
|2 -1  3|
|4  5  0|
|1  2  6|
```

### Using Cofactor Expansion:

1. First term: 2[(5×6) - (0×2)] = 2(30-0) = 60
2. Second term: -(-1)[(4×6) - (0×1)] = 24
3. Third term: 3[(4×2) - (5×1)] = 3(8-5) = 9

Final determinant = 60 + 24 + 9 = 93

## Practice Problems

Try these matrices:

1. |1 2 3|
   |0 1 4|
   |5 6 0|

2. |2 0 0|
   |0 2 0|
   |0 0 2|

3. |1 1 1|
   |2 2 1|
   |3 1 3|

Solutions provided at the bottom of the guide.