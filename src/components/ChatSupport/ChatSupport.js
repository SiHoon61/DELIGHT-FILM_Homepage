import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import {
  AnswerButton,
  AnswerGrid,
  BackButton,
  ChatBody,
  ChatCloseButton,
  ChatComposer,
  ChatLauncher,
  ChatPanel,
  ChatPanelHeader,
  ChatRoot,
  ConsentLabel,
  ContactField,
  ContactFields,
  FormError,
  PanelProgress,
  PanelProgressBar,
  SendButton,
  StepCounter,
  StepTitle,
  SuccessState,
} from './style';

const SURVEY_STEPS = [
  {
    key: 'videoType',
    title: '어떤 영상을 계획하고 계신가요?',
    options: ['홍보·광고', '행사·중계', '공연·콘서트', '숏폼', '기타'],
  },
  {
    key: 'schedule',
    title: '제작 일정은 어느 정도인가요?',
    options: ['2주 이내', '1개월 이내', '1~3개월', '일정 협의'],
  },
  {
    key: 'budget',
    title: '예상 제작 예산을 선택해주세요.',
    options: ['상담 후 결정', '50만원 이하', '50~100만원', '100~500만원', '500만원 이상'],
  },
  {
    key: 'contactMethod',
    title: '어떤 방법으로 답변받고 싶으신가요?',
    options: ['전화', '문자', '카카오톡'],
  },
];

const INITIAL_ANSWERS = {
  videoType: '',
  schedule: '',
  budget: '',
  contactMethod: '',
};

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [footerDock, setFooterDock] = useState({ isDocked: false, top: 0 });
  const chatRootRef = useRef(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [submitState, setSubmitState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeWithEscape);
    return () => window.removeEventListener('keydown', closeWithEscape);
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateFooterDock = () => {
      const socialLinks = document.querySelector('[data-footer-socials]');

      if (!socialLinks) {
        setFooterDock((current) =>
          current.isDocked || current.top ? { isDocked: false, top: 0 } : current
        );
        return;
      }

      const socialRect = socialLinks.getBoundingClientRect();
      const gap = 16;
      const restingBottom = window.innerWidth <= 700 ? 16 : 26;
      const isDocked = socialRect.top <= window.innerHeight - restingBottom + gap;
      const socialTop = socialRect.top + window.scrollY;
      const rootHeight = chatRootRef.current?.offsetHeight || (window.innerWidth <= 700 ? 44 : 50);
      const top = Math.max(
        0,
        Math.floor(socialTop - gap - rootHeight)
      );

      setFooterDock((current) =>
        current.isDocked === isDocked && current.top === top
          ? current
          : { isDocked, top }
      );
    };

    const scheduleFooterDockUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateFooterDock();
      });
    };

    updateFooterDock();
    window.addEventListener('scroll', scheduleFooterDockUpdate, { passive: true });
    window.addEventListener('resize', scheduleFooterDockUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleFooterDockUpdate);
      window.removeEventListener('resize', scheduleFooterDockUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [isOpen]);

  const selectAnswer = (key, value) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => Math.min(current + 1, SURVEY_STEPS.length));
  };

  const resetSurvey = () => {
    setStep(0);
    setAnswers(INITIAL_ANSWERS);
    setName('');
    setPhone('');
    setHasConsent(false);
    setSubmitState('idle');
    setErrorMessage('');
  };

  const submitConsultation = async (event) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !hasConsent) return;

    setSubmitState('sending');
    setErrorMessage('');

    const templateParams = {
      to_Email: 'jhpodong@naver.com',
      user_name: name.trim(),
      user_num: phone.trim(),
      video_type: answers.videoType,
      user_cost: answers.budget,
      user_bodyText: [
        `희망 일정: ${answers.schedule}`,
        `답변 방식: ${answers.contactMethod}`,
        '접수 경로: 웹사이트 실시간 상담',
      ].join('\n'),
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setSubmitState('success');
    } catch (error) {
      setSubmitState('error');
      setErrorMessage('접수에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const currentStep = SURVEY_STEPS[step];
  const isContactStep = step === SURVEY_STEPS.length;
  const isComplete = name.trim() && phone.trim() && hasConsent;

  return (
    <ChatRoot
      ref={chatRootRef}
      $footerDocked={footerDock.isDocked}
      $footerTop={footerDock.top}
    >
      {isOpen && (
        <ChatPanel id="realtime-consultation" role="dialog" aria-labelledby="chat-title">
          <ChatPanelHeader>
            <div>
              <span aria-hidden="true" />
              <strong id="chat-title">실시간 상담</strong>
            </div>
            <ChatCloseButton type="button" onClick={() => setIsOpen(false)} aria-label="상담창 닫기">×</ChatCloseButton>
          </ChatPanelHeader>

          {submitState === 'success' ? (
            <SuccessState>
              <strong>상담 요청이 접수되었습니다.</strong>
              <span>확인 후 선택하신 방법으로 연락드리겠습니다.</span>
              <button type="button" onClick={resetSurvey}>새 문의 작성</button>
            </SuccessState>
          ) : (
            <ChatBody as={isContactStep ? 'form' : 'div'} onSubmit={isContactStep ? submitConsultation : undefined}>
              <PanelProgress>
                <StepCounter>{Math.min(step + 1, SURVEY_STEPS.length + 1)} / {SURVEY_STEPS.length + 1}</StepCounter>
                <PanelProgressBar $progress={((step + 1) / (SURVEY_STEPS.length + 1)) * 100} />
              </PanelProgress>

              {currentStep && (
                <>
                  <StepTitle>{currentStep.title}</StepTitle>
                  <AnswerGrid>
                    {currentStep.options.map((option) => (
                      <AnswerButton key={option} type="button" onClick={() => selectAnswer(currentStep.key, option)}>{option}<span>→</span></AnswerButton>
                    ))}
                  </AnswerGrid>
                </>
              )}

              {isContactStep && (
                <>
                  <StepTitle>연락받으실 정보를 알려주세요.</StepTitle>
                  <ContactFields>
                    <ContactField>
                      <span>성함</span>
                      <input name="consultation-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="성함 입력" required />
                    </ContactField>
                    <ContactField>
                      <span>연락처</span>
                      <input name="consultation-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="010-0000-0000" required />
                    </ContactField>
                    <ConsentLabel>
                      <input type="checkbox" checked={hasConsent} onChange={(event) => setHasConsent(event.target.checked)} />
                      <span>상담 접수를 위한 개인정보 수집에 동의합니다.</span>
                    </ConsentLabel>
                  </ContactFields>
                  {errorMessage && <FormError role="alert">{errorMessage}</FormError>}
                  <SendButton type="submit" disabled={!isComplete || submitState === 'sending'}>
                    {submitState === 'sending' ? '접수 중…' : '상담 요청 보내기'}
                  </SendButton>
                </>
              )}

              {step > 0 && <BackButton type="button" onClick={() => setStep((current) => current - 1)}>← 이전</BackButton>}
            </ChatBody>
          )}
        </ChatPanel>
      )}

      <ChatComposer>
        <ChatLauncher type="button" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen} aria-controls="realtime-consultation">
          실시간 상담
        </ChatLauncher>
      </ChatComposer>
    </ChatRoot>
  );
};

export default ChatSupport;
