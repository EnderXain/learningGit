import $ from 'jquery';

class Modal{
    constructor(){
        this.openModalButton = $('.open-modal');
        this.modal = $('.modal');
        this.closeModalButton = $('.modal__close');
        this.events();
    }

    events(){
        //clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));
        //click modal whitespace to close
        //this.modal.click(this.closeModal.bind(this));
        //clicking the x close modal button
        this.closeModalButton.click(this.closeModal.bind(this));
        //pushes any key
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    keyPressHandler(e){
        if( e.keyCode == 27 )
            this.closeModal();
    }

    openModal(){
        this.modal.addClass('modal--is-visible');
        return false;   //prevents link from scrolling up because of href #
    }

    closeModal(){
        this.modal.removeClass('modal--is-visible');
    }
}

export default Modal;