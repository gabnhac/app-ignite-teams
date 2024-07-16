import {render} from '@testing-library/react-native';
import React from 'react';
import { Button } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '@theme/index';

it("devera renderizar o componente", () => {
    render(
        <ThemeProvider theme={theme}>
            <Button title='Clique'/>
        </ThemeProvider>
    )
})