| Metric     | TestType   | Implementation   |   Slope |     R² |
|:-----------|:-----------|:-----------------|--------:|-------:|
| Time(ms)   | Sorting    | TypeScript       | -0.506  | 0.0014 |
| Time(ms)   | Sorting    | WebAssembly      | -0.0997 | 0.0002 |
| Time(ms)   | AVL Tree   | TypeScript       |  0.0586 | 0      |
| Time(ms)   | AVL Tree   | WebAssembly      |  0.0755 | 0.0001 |
| Time(ms)   | Graph      | TypeScript       |  0.3926 | 0.0003 |
| Time(ms)   | Graph      | WebAssembly      | -0.1121 | 0.0001 |
| Memory(MB) | Sorting    | TypeScript       |  0.0069 | 0      |
| Memory(MB) | Sorting    | WebAssembly      |  0.0101 | 0.0002 |
| Memory(MB) | AVL Tree   | TypeScript       | -0.011  | 0      |
| Memory(MB) | AVL Tree   | WebAssembly      | -0.0007 | 0      |
| Memory(MB) | Graph      | TypeScript       |  0.0327 | 0.0002 |
| Memory(MB) | Graph      | WebAssembly      |  0.016  | 0.0002 |

\begin{tabular}{lllrr}
\toprule
Metric & TestType & Implementation & Slope & R² \\
\midrule
Time(ms) & Sorting & TypeScript & -0.506000 & 0.001400 \\
Time(ms) & Sorting & WebAssembly & -0.099700 & 0.000200 \\
Time(ms) & AVL Tree & TypeScript & 0.058600 & 0.000000 \\
Time(ms) & AVL Tree & WebAssembly & 0.075500 & 0.000100 \\
Time(ms) & Graph & TypeScript & 0.392600 & 0.000300 \\
Time(ms) & Graph & WebAssembly & -0.112100 & 0.000100 \\
Memory(MB) & Sorting & TypeScript & 0.006900 & 0.000000 \\
Memory(MB) & Sorting & WebAssembly & 0.010100 & 0.000200 \\
Memory(MB) & AVL Tree & TypeScript & -0.011000 & 0.000000 \\
Memory(MB) & AVL Tree & WebAssembly & -0.000700 & 0.000000 \\
Memory(MB) & Graph & TypeScript & 0.032700 & 0.000200 \\
Memory(MB) & Graph & WebAssembly & 0.016000 & 0.000200 \\
\bottomrule
\end{tabular}