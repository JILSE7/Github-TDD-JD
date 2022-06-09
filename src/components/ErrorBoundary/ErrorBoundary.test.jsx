import { screen, render, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";


jest.spyOn(console, 'error');

const ThrowError = () => {
    throw new Error('ups');
}
const getButton = (nameBtn) => screen.getByRole('button', {name: new RegExp(nameBtn, 'i')});

describe('When the component works without errors', () => { 
    test('must render the component content', () => { 

        render(
            <ErrorBoundary>
                <h1>HOla mi tio</h1>
            </ErrorBoundary>
        );


        expect(screen.getByText(/hola mi tio/i)).toBeInTheDocument();

    });

})


describe('When the component throws an error', () => { 
    test('must render the message "There is un unexpected error" and a reload button', () => { 

        render(
            <ErrorBoundary>
                <ThrowError/>
            </ErrorBoundary>
        );

        expect(screen.getByText(/there is un unexpected error/i)).toBeInTheDocument();
        expect(getButton('reload')).toBeInTheDocument();
    })
});


describe('when the user clicks on reload button', () => { 
    test('Must reload the app', () => { 
        delete window.location;
        window.location = {reload: jest.fn()}

        render(
            <ErrorBoundary>
                <ThrowError/>
            </ErrorBoundary>
        );

        fireEvent.click(getButton('reload'));

        expect(window.location.reload).toHaveBeenCalled();


    });
})

