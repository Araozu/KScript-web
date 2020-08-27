import { computed, defineComponent, ref, watch, nextTick, onMounted, h } from 'vue';

const KEYCODE_ENTER = 13;
const KEYCODE_TAB = 9;
const KEYCODE_BACKSPACE = 8;
const KEYCODE_Y = 89;
const KEYCODE_Z = 90;
const KEYCODE_M = 77;
const KEYCODE_PARENS = 57;
const KEYCODE_BRACKETS = 219;
const KEYCODE_QUOTE = 222;
const KEYCODE_BACK_QUOTE = 192;
const KEYCODE_ESCAPE = 27;

const HISTORY_LIMIT = 100;
const HISTORY_TIME_GAP = 3000;

const isWindows = 'navigator' in global && /Win/i.test(navigator.platform);
const isMacLike = 'navigator' in global && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

export interface EditorProps {
    lineNumbers: boolean;
    autoStyleLineNumbers: boolean;
    readonly: boolean;
    value: string;
    highlight: () => string;
    tabSize: number;
    insertSpaces: boolean;
    ignoreTabKey: boolean;
    placeholder: string;
}

export interface Record {
    value: string;
    selectionStart: number;
    selectionEnd: number;
}

export interface History {
    stack: Array<Record & { timestamp: number }>;
    offset: number;
}

export default defineComponent({
    props: {
        lineNumbers: {
            type: Boolean,
            default: false,
        },
        autoStyleLineNumbers: {
            type: Boolean,
            default: true,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            default: '',
        },
        highlight: {
            type: Function,
            required: true,
        },
        tabSize: {
            type: Number,
            default: 2,
        },
        insertSpaces: {
            type: Boolean,
            default: true,
        },
        ignoreTabKey: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
    },
    setup(props, context) {

        const capture = ref(true);
        const history = ref({
            stack: [],
            offset: -1,
        } as History);
        const lineNumbersHeight = ref("20px");
        const codeData = ref("");

        const refPreview = ref(null);
        const refLineNumbers = ref(null);
        const refTextArea = ref(null);

        // ========= computed

        const isEmpty = computed((): boolean => codeData.value.length === 0);
        const content = computed((): string => this.highlight(this.codeData) + '<br />');
        const lineNumbersCount = computed((): number => codeData.value.split(/\r\n|\n/).length);

        // ========= watch

        watch(props.value, (newVal) => {
            if (!newVal) {
                codeData.value = '';
            } else {
                codeData.value = newVal as string;
            }
        });

        watch(content, () => {
            if (props.lineNumbers) {
                nextTick(() => {
                    setLineNumbersHeight();
                });
            }
        });

        watch(props.lineNumbers, () => {
            nextTick(() => {
                styleLineNumbers();
                setLineNumbersHeight();
            });
        });

        // ========= methods

        const setLineNumbersHeight = () => {
            lineNumbersHeight.value = getComputedStyle(preview.value).height;
        };

        const styleLineNumbers = () => {
            if (!props.lineNumbers || !props.autoStyleLineNumbers) return;

            const $editor = preview.value;
            const $lineNumbers = refLineNumbers.value as HTMLDivElement;
            const editorStyles = window.getComputedStyle($editor);

            nextTick(() => {
                const btlr: any = 'border-top-left-radius';
                const bblr: any = 'border-bottom-left-radius';
                if (!$lineNumbers) return;
                $lineNumbers.style[btlr] = editorStyles[btlr];
                $lineNumbers.style[bblr] = editorStyles[bblr];
                $editor.style[btlr] = '0';
                $editor.style[bblr] = '0';

                const stylesList = ['background-color', 'margin-top', 'padding-top', 'font-family', 'font-size', 'line-height'];
                stylesList.forEach((style: any) => {
                    $lineNumbers.style[style] = editorStyles[style];
                });
                $lineNumbers.style['margin-bottom' as any] = '-' + editorStyles['padding-top' as any];
            });
        };

        const _recordCurrentState = (): void => {
            const input = refTextArea.value as HTMLTextAreaElement;

            if (!input) return;
            // Save current state of the input
            const {value, selectionStart, selectionEnd} = input;

            _recordChange({
                value,
                selectionStart,
                selectionEnd,
            });
        };

        const _getLines = (text: string, position: number): Array<string> => text.substring(0, position).split('\n');

        const _applyEdits = (record: Record): void => {
            // Save last selection state
            const input = refTextArea.value as HTMLTextAreaElement;
            const last = history.value.stack[history.value.offset];

            if (last && input) {
                history.value.stack[history.value.offset] = {
                    ...last,
                    selectionStart: input.selectionStart,
                    selectionEnd: input.selectionEnd,
                };
            }

            // Save the changes
            _recordChange(record);
            _updateInput(record);
        };

        const _updateInput = (record: Record): void => {
            const input = refTextArea.value as HTMLTextAreaElement;

            if (!input) return;

            // Update values and selection state
            input.value = record.value;
            input.selectionStart = record.selectionStart;
            input.selectionEnd = record.selectionEnd;

            context.emit("input", record.value);
            // this.props.onValueChange(record.value);
        };

        const _recordChange = (record: Record, overwrite = false): void => {
            const {stack, offset} = history.value;

            if (stack.length && offset > -1) {
                // When something updates, drop the redo operations
                history.value.stack = stack.slice(0, offset + 1);

                // Limit the number of operations to 100
                const count = history.value.stack.length;

                if (count > HISTORY_LIMIT) {
                    const extras = count - HISTORY_LIMIT;

                    history.value.stack = stack.slice(extras, count);
                    history.value.offset = Math.max(history.value.offset - extras, 0);
                }
            }

            const timestamp = Date.now();

            if (overwrite) {
                const last = history.value.stack[history.value.offset];

                if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
                    // A previous entry exists and was in short interval

                    // Match the last word in the line
                    const re = /[^a-z0-9]([a-z0-9]+)$/i;

                    // Get the previous line
                    const previous = _getLines(last.value, last.selectionStart).pop()?.match(re);

                    // Get the current line
                    const current = _getLines(record.value, record.selectionStart).pop()?.match(re);

                    if (previous && current && current[1].startsWith(previous[1])) {
                        // The last word of the previous line and current line match
                        // Overwrite previous entry so that undo will remove whole word
                        history.value.stack[history.value.offset] = {
                            ...record,
                            timestamp,
                        };

                        return;
                    }
                }
            }

            // Add the new operation to the stack
            history.value.stack.push({...record, timestamp});
            history.value.offset++;
        };

        const handleChange = (e: KeyboardEvent): void => {
            const {value, selectionStart, selectionEnd} = e.target as HTMLTextAreaElement;

            _recordChange(
                {
                    value,
                    selectionStart,
                    selectionEnd,
                },
                true
            );
            context.emit('input', value);
            // this.props.onValueChange(value);
        };

        const _undoEdit = (): void => {
            const {stack, offset} = history.value;

            // Get the previous edit
            const record = stack[offset - 1];

            if (record) {
                // Apply the changes and update the offset
                _updateInput(record);
                history.value.offset = Math.max(offset - 1, 0);
            }
        };

        const _redoEdit = () => {
            const {stack, offset} = history.value;

            // Get the next edit
            const record = stack[offset + 1];

            if (record) {
                // Apply the changes and update the offset
                _updateInput(record);
                history.value.offset = Math.min(offset + 1, stack.length - 1);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // console.log(navigator.platform);
            const {tabSize, insertSpaces, ignoreTabKey} = props;

            // ?
            // if (this.$listeners.keydown) {
            // onKeyDown(e);
            context.emit('keydown', e);

            if (e.defaultPrevented) {
                return;
            }
            // }

            if (e.keyCode === KEYCODE_ESCAPE) {
                (<HTMLTextAreaElement>e.target).blur();
                context.emit('blur', e);
            }

            const {value, selectionStart, selectionEnd} = e.target as HTMLTextAreaElement;

            const tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);

            if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && capture.value) {
                // Prevent focus change
                e.preventDefault();

                if (e.shiftKey) {
                    // Unindent selected lines
                    const linesBeforeCaret = _getLines(value, selectionStart);
                    const startLine = linesBeforeCaret.length - 1;
                    const endLine = _getLines(value, selectionEnd).length - 1;
                    const nextValue = value
                        .split('\n')
                        .map((line, i) => {
                            if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
                                return line.substring(tabCharacter.length);
                            }

                            return line;
                        })
                        .join('\n');

                    if (value !== nextValue) {
                        const startLineText = linesBeforeCaret[startLine];

                        _applyEdits({
                            value: nextValue,
                            // Move the start cursor if first line in selection was modified
                            // It was modified only if it started with a tab
                            selectionStart: startLineText.startsWith(tabCharacter)
                                ? selectionStart - tabCharacter.length
                                : selectionStart,
                            // Move the end cursor by total number of characters removed
                            selectionEnd: selectionEnd - (value.length - nextValue.length),
                        });
                    }
                } else if (selectionStart !== selectionEnd) {
                    // Indent selected lines
                    const linesBeforeCaret = _getLines(value, selectionStart);
                    const startLine = linesBeforeCaret.length - 1;
                    const endLine = _getLines(value, selectionEnd).length - 1;
                    const startLineText = linesBeforeCaret[startLine];

                    _applyEdits({
                        value: value
                            .split('\n')
                            .map((line, i) => {
                                if (i >= startLine && i <= endLine) {
                                    return tabCharacter + line;
                                }

                                return line;
                            })
                            .join('\n'),
                        // Move the start cursor by number of characters added in first line of selection
                        // Don't move it if it there was no text before cursor
                        selectionStart: /\S/.test(startLineText) ? selectionStart + tabCharacter.length : selectionStart,
                        // Move the end cursor by total number of characters added
                        selectionEnd: selectionEnd + tabCharacter.length * (endLine - startLine + 1),
                    });
                } else {
                    const updatedSelection = selectionStart + tabCharacter.length;

                    _applyEdits({
                        // Insert tab character at caret
                        value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: updatedSelection,
                        selectionEnd: updatedSelection,
                    });
                }
            } else if (e.keyCode === KEYCODE_BACKSPACE) {
                const hasSelection = selectionStart !== selectionEnd;
                const textBeforeCaret = value.substring(0, selectionStart);

                if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
                    // Prevent default delete behaviour
                    e.preventDefault();

                    const updatedSelection = selectionStart - tabCharacter.length;

                    _applyEdits({
                        // Remove tab character at caret
                        value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: updatedSelection,
                        selectionEnd: updatedSelection,
                    });
                }
            } else if (e.keyCode === KEYCODE_ENTER) {
                // Ignore selections
                if (selectionStart === selectionEnd) {
                    // Get the current line
                    const line = _getLines(value, selectionStart).pop();
                    const matches = line?.match(/^\s+/);

                    if (matches && matches[0]) {
                        e.preventDefault();

                        // Preserve indentation on inserting a new line
                        const indent = '\n' + matches[0];
                        const updatedSelection = selectionStart + indent.length;

                        _applyEdits({
                            // Insert indentation character at caret
                            value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
                            // Update caret position
                            selectionStart: updatedSelection,
                            selectionEnd: updatedSelection,
                        });
                    }
                }
            } else if (
                e.keyCode === KEYCODE_PARENS ||
                e.keyCode === KEYCODE_BRACKETS ||
                e.keyCode === KEYCODE_QUOTE ||
                e.keyCode === KEYCODE_BACK_QUOTE
            ) {
                let chars;

                if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
                    chars = ['(', ')'];
                } else if (e.keyCode === KEYCODE_BRACKETS) {
                    if (e.shiftKey) {
                        chars = ['{', '}'];
                    } else {
                        chars = ['[', ']'];
                    }
                } else if (e.keyCode === KEYCODE_QUOTE) {
                    if (e.shiftKey) {
                        chars = ['"', '"'];
                    } else {
                        chars = ["'", "'"];
                    }
                } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
                    chars = ['`', '`'];
                }

                // console.log(isMacLike, "navigator" in global && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));

                // If text is selected, wrap them in the characters
                if (selectionStart !== selectionEnd && chars) {
                    e.preventDefault();

                    _applyEdits({
                        value:
                            value.substring(0, selectionStart) +
                            chars[0] +
                            value.substring(selectionStart, selectionEnd) +
                            chars[1] +
                            value.substring(selectionEnd),
                        // Update caret position
                        selectionStart,
                        selectionEnd: selectionEnd + 2,
                    });
                }
            } else if (
                (isMacLike
                        // Trigger undo with ⌘+Z on Mac
                        ? e.metaKey && e.keyCode === KEYCODE_Z
                        // Trigger undo with Ctrl+Z on other platforms
                        : e.ctrlKey && e.keyCode === KEYCODE_Z
                ) &&
                !e.shiftKey &&
                !e.altKey
            ) {
                e.preventDefault();

                _undoEdit();
            } else if (
                (isMacLike
                    ? // Trigger redo with ⌘+Shift+Z on Mac
                    e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey
                    : isWindows
                        ? // Trigger redo with Ctrl+Y on Windows
                        e.ctrlKey && e.keyCode === KEYCODE_Y
                        : // Trigger redo with Ctrl+Shift+Z on other platforms
                        e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) &&
                !e.altKey
            ) {
                e.preventDefault();

                _redoEdit();
            } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
                e.preventDefault();

                // Toggle capturing tab key so users can focus away
                capture.value = !capture.value;
            }
        };

        onMounted(() => {
            _recordCurrentState();
            styleLineNumbers();
        });

        // ========= render

        const lineNumberWidthCalculator = h(
            'div',
            {
                attrs: {
                    class: 'prism-editor__line-width-calc',
                    style: 'height: 0px; visibility: hidden; pointer-events: none;',
                },
            },
            "999"
        );
        const lineNumbers = h(
            'div',
            {
                staticClass: 'prism-editor__line-numbers',
                style: {
                    'min-height': lineNumbersHeight.value,
                },
                'aria-hidden': 'true',
            },
            [
                lineNumberWidthCalculator,
                Array.from(Array(lineNumbersCount.value).keys()).map((_, index) => {
                    return h('div', { attrs: { class: 'prism-editor__line-number token comment' } }, `${++index}`);
                }),
            ]
        );

        const textarea = h('textarea', {
            ref: 'textarea',
            onInput: handleChange,
            onKeydown: handleKeyDown,
            onClick: ($event: MouseEvent) => {
                context.emit('click', $event);
            },
            onKeyup: ($event: KeyboardEvent) => {
                context.emit('keyup', $event);
            },
            onFocus: ($event: FocusEvent) => {
                context.emit('focus', $event);
            },
            onBlur: ($event: FocusEvent) => {
                context.emit('blur', $event);
            },
            staticClass: 'prism-editor__textarea',
            class: {
                'prism-editor__textarea--empty': this.isEmpty,
            },
            spellCheck: 'false',
            autocapitalize: 'off',
            autocomplete: 'off',
            autocorrect: 'off',
            'data-gramm': 'false',
            placeholder: props.placeholder,
            'data-testid': 'textarea',
            readonly: props.readonly,
            value: codeData.value,
        });
        const preview = h('pre', {
            ref: 'pre',
            staticClass: 'prism-editor__editor',
            attrs: {
                'data-testid': 'preview',
            },
            domProps: {
                innerHTML: this.content,
            },
        });
        const editorContainer = h('div', { staticClass: 'prism-editor__container' }, [textarea, preview]);

        return () => {
            return h('div', { staticClass: 'prism-editor-wrapper' }, [lineNumbers, editorContainer]);
        };

        return {
            capture,
            history,
            lineNumbersHeight,
            codeData,
            refPreview,
            refLineNumbers,
            refTextArea,
            isEmpty,
            content,
            lineNumbersCount,
            setLineNumbersHeight,
            styleLineNumbers,
            handleChange,
            handleKeyDown
        };
    }
});
