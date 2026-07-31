import React, { useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Download, Heart } from 'lucide-react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

/**
 * Letter Page - Romantic Elegance Design
 * Features: Personalized letter message, PDF download
 */
export default function Letter() {
  const [, setLocation] = useLocation();
  const [currentSection, setCurrentSection] = useState(0);
  const fullLetterRef = useRef<HTMLDivElement>(null);

  const letterSections = useMemo(
    () => [
      {
        title: 'My Dearest,',
        content: [
          'Happy Girlfriend Day my madamji😘😘😘😘😘😘😘😘... Kabhi socha tha ki yeh din bhi celebrate karenge 😂😂😂... Lekin thike... Abh din aapka hai toh kyu na kare celebrate 😗😗😗...',

          'Waise toh bohot kuch tarif likh sakta hu me aapki peshkash me lekin har baar tarif.... Na na 😗😗... Aaj me aapko likhta hu... Girlfriend day hai toh abh batana toh padega ki kaisi hai meri gf 😗😗...',

          'Toh koi bhi mujhe puchega na ki kaisi hai Teri gf... Mera sabse pehla jawab niklega ki meri choti bacchi hai woh... Haa height me mere jitni hai, mere saath padhti hai, lekin Mann se... Abhi bhi ek pyaari bacchi ki tarah hai... Usko na tarif me bohot kuch bol lo phir bhi usko yaad sirf yehi rahega ki mene galtiya kya nikali hai 😂😂... Usko tarif yaad hi nahi rehti... Meri toh bilkul nahi... Naa 😗😗... Lekin usse meri har cheez yaad hai... Haa dates me thoda kacchi hai... But uss moment me kya hua tha, kya feel hua tha woh sab barabar yaad rehta hai 😏😏... Aree main toh batana hi bhool gaya... Uska gussa toh baapre... But according to her... My girlfriend is always right😁😁 ( dar ke bol raha hu ha 🥲🥲 )... '
        ],
      },
      {
        title: '',
        content: [
          'Yeh sab thike... Lekin mere liye main baat toh abh hai... Uske pyaar karne ka tarika... Haa introvert Tanvi abhi bhi uske andar hai lekin jab extroverted Tanvi bahar aati hai tab toh mujhe shock me daal deti hai... Ki yeh aise bhi pyaar kar sakti hai phir bhi nahi karti 😗😗... Aur uska pyaar uski smile me chupa hua hota hai... Jaise hi woh mujhe dekh ke smile karti hai... Koi bhi dekh ke bol dega ki iske dil me mere liye kuch hai... Kyu ki uski aakhen jhut bol nahi pati aur uski smile woh sab express bhi kar dete hai... ',

          "But genuinely... I have never seen anyone being so cute in anger 😗😗... She is the cutest person in my life and I'm glad that this cuteness is a part of my heart and life... Thank you for choosing this gadha and thank you for giving me the cutest girlfriend... I love you more and more my cute girlfriend 😘😘😘😘😘😘😘😘😘... My madamji... My love... My better half... 🫂🫂🫂🫂"
        ],
      },
      {
        title: 'Dear My Mistry',
        content: [
          "Me Tanvi Singh... Dwijesh Mistry... Mere Mistry ki girlfriend aka madamji aka better half... Yeh letter apne pure hosh me sign kar rahi hu... ",

          "Me uss se bohot pyaar karti hu aur karti rahungi because woh bohot caring hai and mujhse bohot pyaar karta hai lekin me usko bohot tang karti hu... Me uska khoon choosti hu and mujhe yeh dar hai ki kahi meri wajase woh aur patla na ho jaaye...",

          "But genuinely I love him so much that I can't express isliye yeh bol ke and apna sign kar ke express kar rahi hu... Yeh sign kar ke me yeh bata rahi hu ki humesha aise hi dimaag kharab karti rahungi and mere Mistry ke paas koi option nahi hai mujhe jhelne ke alawa...",

          "Your lovingly",
          "Mrs Mistry",
        ],
      },
    ],
    []
  );

  const currentSectionData = letterSections[currentSection];
  const isFinalSection = currentSection === letterSections.length - 1;
  const finalLetterBody = currentSectionData.content.slice(0, -2);
  const finalLetterSignature = currentSectionData.content.slice(-2);

  const escapeHtml = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  // preserve explicit newlines when rendering text
  const renderTextWithBreaks = (text: string) =>
    text.split('\n').map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  const handleNextSection = () => {
    setCurrentSection((section) => Math.min(section + 1, letterSections.length - 1));
  };

  const handlePreviousSection = () => {
    setCurrentSection((section) => Math.max(section - 1, 0));
  };

  const handleDownloadPDF = async () => {
    if (!isFinalSection || typeof document === 'undefined') return;
    const response = await fetch('/letter-pdf-template.html');
    if (!response.ok) return;

    const templateHtml = await response.text();
    const bodyHtml = finalLetterBody
      .map(
        (paragraph) =>
          `<p style="margin:0 0 16px 0;font-size:18px;line-height:1.8;color:#2d2d2d;white-space:pre-wrap;text-indent:18px;">${escapeHtml(paragraph)}</p>`
      )
      .join('');
    const signoffHtml = finalLetterSignature
      .map(
        (line, index) =>
          `<p style="margin:${index === 0 ? '2px' : '0'} 0 0 0;font-size:18px;line-height:1.8;color:#2d2d2d;white-space:pre-wrap;text-indent:18px;">${escapeHtml(line)}</p>`
      )
      .join('');

    const filledTemplate = templateHtml
      .replace('{{TITLE}}', escapeHtml(currentSectionData.title))
      .replace('{{BODY_HTML}}', bodyHtml)
      .replace('{{SIGNOFF_HTML}}', signoffHtml);

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.left = '-10000px';
    iframe.style.top = '0';
    iframe.style.width = '800px';
    iframe.style.height = '1200px';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';
    iframe.setAttribute('aria-hidden', 'true');
    iframe.srcdoc = filledTemplate;

    document.body.appendChild(iframe);

    await new Promise<void>((resolve, reject) => {
      iframe.onload = () => resolve();
      iframe.onerror = () => reject(new Error('Failed to load PDF template iframe'));
    });

    const iframeDocument = iframe.contentDocument;
    const exportRoot = iframeDocument?.querySelector<HTMLElement>('[data-pdf-root]');

    if (!exportRoot) {
      iframe.remove();
      return;
    }

    if (iframeDocument?.fonts?.ready) {
      await iframeDocument.fonts.ready;
    }

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const opt: any = {
      margin: 0,
      filename: 'Girlfriends-Day-Letter-Section-3.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    (html2pdf() as any)
      .set(opt)
      .from(exportRoot)
      .save()
      .finally(() => {
        iframe.remove();
      });
  };

  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-[#FFFBF7] to-[#F5E6E0] overflow-hidden py-12">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 40 + 'px',
              height: Math.random() * 100 + 40 + 'px',
              background: `radial-gradient(circle, #E8B4C8, transparent)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 30 + 25}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-[#E8B4C8] fill-current animate-pulse" />
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-[#8B6B7F] mb-4">
              {isFinalSection ? 'The Last Love Note' : 'A Letter for You'}
            </h1>
            <p className="font-lato text-[#2D2D2D]">
              {isFinalSection ? 'The most intimate part of my heart' : 'Words from my heart to yours'}
            </p>
          </div>

          {/* Letter Content */}
          <div
            ref={fullLetterRef}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-12 mb-8 border border-[#E8B4C8]/20"
            style={{
              boxShadow: '0 20px 60px rgba(232, 180, 200, 0.2)',
            }}
          >
            <div className="prose prose-sm max-w-none">
              {currentSection < 2 && (
                <>
                  <p className="font-cormorant text-2xl text-[#E8B4C8] mb-6">
                    <Heart className="inline w-5 h-5 fill-current mr-2" />
                    {currentSectionData.title}
                  </p>
                  {currentSectionData.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="font-lato text-[#2D2D2D] leading-relaxed mb-4 text-lg pl-4"
                    >
                      {renderTextWithBreaks(paragraph)}
                    </p>
                  ))}
                </>
              )}


              {currentSection === 2 && (
                <div className="space-y-6">
                  <div
                    className="rounded-2xl p-6 text-white shadow-[0_18px_50px_rgba(139,107,127,0.24)]"
                    style={{
                      backgroundColor: '#8B6B7F',
                      border: '1px solid rgba(232, 180, 200, 0.25)',
                    }}
                  >
                    <p className="font-lato leading-relaxed text-white/90 text-lg pl-4">
                      {renderTextWithBreaks(
                        'Chal aaj girlfriend day ki khushi me... Me tujhe ek super power deta hu😗😗... Lock up dekh ke yeh idea aaya 😜😜...\n\nTujhe jab bhi bohot gussa aaye n tujhe chodne waale khayal aaye toh yeh neeche waale letter ko download karna and uspe sign kar ke bhej dena... This will be considered as our relationship fake divorce papers 😗😗... Asli me kal hi mat bhej dena 🥲🥲...'
                      )}
                    </p>
                  </div>

                  {/* Top: Main final letter content */}
                  <div
                    className="rounded-2xl border p-6 shadow-[0_16px_45px_rgba(232,180,200,0.12)]"
                    style={{
                      backgroundColor: '#FFF7FA',
                      borderColor: 'rgba(232, 180, 200, 0.25)',
                    }}
                  >
                    <p className="font-cormorant text-3xl text-[#8B6B7F] mb-2">
                      {currentSectionData.title}
                    </p>

                    {finalLetterBody.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-lato text-[#2D2D2D] leading-relaxed mb-4 text-lg pl-4"
                      >
                        {renderTextWithBreaks(paragraph)}
                      </p>
                    ))}

                    <div className="mt-6 border-t border-[#E8B4C8]/20 pt-4">
                      {finalLetterSignature.map((line, index) => (
                        <p
                          key={index}
                          className="font-lato text-[#2D2D2D] leading-relaxed text-lg pl-4"
                        >
                          {renderTextWithBreaks(line)}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={handlePreviousSection}
              disabled={currentSection === 0}
              variant="outline"
              className="px-6 py-3 rounded-full border-[#E8B4C8] text-[#8B6B7F] hover:bg-[#F5E6E0] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextSection}
              disabled={isFinalSection}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#E8B4C8] to-[#D4A5B8] text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Next
            </Button>
            <Button
              onClick={handleDownloadPDF}
              disabled={!isFinalSection}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#8B6B7F] to-[#6B5B6F] text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Download className="w-5 h-5" />
              Download Final Page
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="text-[#8B6B7F] hover:text-[#E8B4C8] transition-colors"
            >
              ← Back to Start
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-40px) translateX(20px);
            opacity: 0.3;
          }
        }

        .prose p {
          all: unset;
          display: block;
        }
      `}</style>
    </div>
  );
}
